import { ok } from "true-myth/result";
import { TodoListProperties, TodoListAggregateRoot } from "../../src/entities/todo-list.js";
import { TodoListRepositoryInterface } from "../../src/interfaces/repositories/todo-list.js";

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
