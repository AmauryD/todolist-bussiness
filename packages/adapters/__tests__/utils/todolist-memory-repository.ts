import { TodoListProperties, TodoListAggregateRoot } from "todo-domain";
import { TodoListRepositoryInterface } from "todo-domain";

export class TodoListInMemoryRepository implements TodoListRepositoryInterface {
	public todos : TodoListAggregateRoot[] = [];

	public create(structure: TodoListProperties): TodoListAggregateRoot {
		const created = TodoListAggregateRoot.create(structure);
		this.todos.push(created);
		return created;
	}
    
	public list(): TodoListAggregateRoot[] {
		return this.todos;
	}
}