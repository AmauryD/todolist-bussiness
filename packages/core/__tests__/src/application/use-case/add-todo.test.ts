import assert from "assert";
import test from "node:test";
import { Result, Maybe } from "true-myth";
import { just } from "true-myth/maybe";
import { Ok } from "true-myth/result";
import { AddTodoToTodoListUseCase } from "../../../../src/application/todos/use-cases/add-todo/use-case.js";
import { Identifier, IdGeneratorInterface, TodoListAggregateRoot, TodoListRepositoryInterface } from "../../../../src/index.js";

class IdGenerator implements IdGeneratorInterface {
	public generate(): Identifier {
		return Identifier.create("1");
	}
}

const todoList = TodoListAggregateRoot.create({
	id: Identifier.create("1"),
	name: "name",
	ownerId: Identifier.create("1")
}) as Ok<TodoListAggregateRoot,never>;

class TodoRepository implements TodoListRepositoryInterface {
	public create(structure: TodoListAggregateRoot): Promise<Result<void, Error>> {
		throw new Error("Method not implemented.");
	}
	public async update(todoList: TodoListAggregateRoot): Promise<void> {
		return;
	}
	public listForUser(): Promise<Result<TodoListAggregateRoot[], Error>> {
		throw new Error("Method not implemented.");
	}
	public async findTodoListById(): Promise<Maybe<TodoListAggregateRoot>> {
		return just(todoList.value);
	}
}


test("Adds a todo to an existing todo-list", async (t: any) => {
	const useCase = new AddTodoToTodoListUseCase(
		new TodoRepository(),
		new IdGenerator()
	);

	const result = await useCase.execute({
		title: "Wash my room",
		todoListId: "1"
	});
    
	const domainEvents = todoList.value.domainEvents;
    
	assert.strictEqual(result.isOk, true);
	assert.strictEqual(domainEvents.length, 2);
	assert.strictEqual(domainEvents.at(1)?.getId(), "1");
	assert.strictEqual(domainEvents.at(1)?.constructor.name, "TodoCreatedEvent");
});