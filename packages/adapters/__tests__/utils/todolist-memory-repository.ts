
import { TodoListProperties, TodoListAggregateRoot } from "todo-domain";
import { TodoListRepositoryInterface } from "todo-domain";
import { ok } from "true-myth/result";

export class TodoListInMemoryRepository implements TodoListRepositoryInterface {
	public todos : TodoListAggregateRoot[] = [];

	public async create(structure: TodoListProperties) {
		const created = TodoListAggregateRoot.create(structure);
		if (created.isOk) {
			this.todos.push(created.value);
		}
		return created;
	}
    
	public async list() {
		return ok<TodoListAggregateRoot[],never>(this.todos.map((t) =>t));
	}
}