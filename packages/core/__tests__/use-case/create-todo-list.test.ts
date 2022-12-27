import { IdGeneratorInterface } from "../../src/interfaces/id-generator.js";
import { CreateTodoListUseCase } from "../../src/use-cases/todo-list/create.js";
import { FakeTodoListRepository } from "./common.js";
import { test } from "node:test";
import assert from "node:assert";

class IdGenerator implements IdGeneratorInterface {
	public generate(): string {
		return "1";
	}
}

test("It creates a todo-list", async () => {
	const createTodoListUseCase = new CreateTodoListUseCase(
		new IdGenerator(),
		new FakeTodoListRepository()
	);
	const todoSnapshot = await createTodoListUseCase.execute({
		name: "name"
	});
	assert.deepStrictEqual(todoSnapshot.isOk ? todoSnapshot.value.snapshot() : todoSnapshot.error,{
		name: "name",
		id: "1",
		todos: [],
		isDone: true
	});
});