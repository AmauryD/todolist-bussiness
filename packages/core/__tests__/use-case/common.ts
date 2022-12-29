import { ok } from "true-myth/result";
import { TodoListRepositoryInterface } from "../../src/domain/todos/repositories/todo-list.js";
import { TodoListAggregateRoot, TodoListProperties } from "../../src/index.js";

export class FakeTodoListRepository implements TodoListRepositoryInterface {
	public async list() {
		const fakeExistingTodo = TodoListAggregateRoot.create({
			name: "title",
			id: "1"
		});
		return fakeExistingTodo.mapOr(ok<TodoListAggregateRoot[],never>([]),(v) => ok<TodoListAggregateRoot[], never>([v]));
	}

	public async create(props: TodoListProperties) {
		return TodoListAggregateRoot.create(props);
	}
}
