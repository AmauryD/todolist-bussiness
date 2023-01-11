import Result, { ok, Ok } from "true-myth/result";
import { TodoListRepositoryInterface } from "../../../../src/application/todos/repositories/todo-list.js";
import { Identifier, TodoListAggregateRoot, TodoListProperties } from "../../../../src/domain/index.js";

export class FakeTodoListRepository implements TodoListRepositoryInterface {
	public async list(): Promise<Result<TodoListAggregateRoot[], never>> {
		const fakeExistingTodo = TodoListAggregateRoot.create({
			name: "title",
			id: Identifier.create("1")
		}) as Ok<TodoListAggregateRoot,never>;
		return ok([fakeExistingTodo.value]);
	}

	public async create(props: TodoListProperties) {
		return TodoListAggregateRoot.create(props);
	}
}
