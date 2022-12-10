import { TodoListProperties, TodoListAggregateRoot } from "../../src/entities/todo-list.js";
import { TodoListRepositoryInterface } from "../../src/interfaces/repositories/todo-list.js";

export class FakeTodoListRepository implements TodoListRepositoryInterface {
	public list(): TodoListAggregateRoot[] {
		return [TodoListAggregateRoot.create({
			name: "title",
			id: "1"
		})];
	}

	public create(props: TodoListProperties): TodoListAggregateRoot {
		return TodoListAggregateRoot.create(props);
	}
}
