import Result, { ok, Ok } from "true-myth/result";
import { TodoListRepositoryInterface } from "../../src/domain/todos/repositories/todo-list.js";
import { TodoListAggregateRoot, TodoListProperties } from "../../src/index.js";
import { identifier } from "../fixtures/identifier.js";

export class FakeTodoListRepository implements TodoListRepositoryInterface {
	public async list(): Promise<Result<TodoListAggregateRoot[], never>> {
		const fakeExistingTodo = TodoListAggregateRoot.create({
			name: "title",
			id: identifier("1")
		}) as Ok<TodoListAggregateRoot,never>;
		return ok([fakeExistingTodo.value]);
	}

	public async create(props: TodoListProperties) {
		return TodoListAggregateRoot.create(props);
	}
}
