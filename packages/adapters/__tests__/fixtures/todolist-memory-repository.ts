
import { TodoListProperties, TodoListAggregateRoot } from "todo-domain";
import { TodoListRepositoryInterface } from "todo-domain";
import { Maybe } from "true-myth";
import { ok } from "true-myth/result";

export class TodoListInMemoryRepository implements TodoListRepositoryInterface {
	public todos : TodoListAggregateRoot[] = [];
	
	public async findTodoListById(todoListId: string): Promise<Maybe<TodoListAggregateRoot>> {
		throw new Error("Method not implemented.");
	}
	public async update(todoList: TodoListAggregateRoot): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public async create(structure: TodoListProperties) {
		const created = TodoListAggregateRoot.create(structure);
		if (created.isOk) {
			this.todos.push(created.value);
		}
		return ok<void, Error>(undefined);
	}
    
	public async listForUser() {
		return ok<TodoListAggregateRoot[],never>(this.todos.map((t) =>t));
	}
}