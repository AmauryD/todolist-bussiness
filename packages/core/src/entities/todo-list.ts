import { TodoListNameRequiredError } from "../errors/todo-list-name-required.js";
import { Todo, TodoPropertiesInterface } from "./todo.js";

export interface TodoListProperties {
    id: string,
    name: string
}

export class TodoListAggregateRoot {
	private _todos: Set<Todo> = new Set();

	private constructor(
        private props: TodoListProperties
	) {}

	public isDone() {
		return [...this.todos.values()].every((todo) => todo.isDone);
	}

	public get name() {
		return this.props.name;
	}

	public get id() {
		return this.props.id;
	}

	public get todos(): ReadonlySet<Todo> {
		return this._todos;
	}

	public addTodo(todo: TodoPropertiesInterface) {
		const newTodo = Todo.create(todo);
		this._todos.add(newTodo);
	}

	public removeTodo(todoId: TodoPropertiesInterface["id"]) {
		for (const todo of this.todos.values()) {
			if (todo.id === todoId) {
				this._todos.delete(todo);
				return;
			}
		}
	}

	public static create(props: TodoListProperties): TodoListAggregateRoot {
		if (!props.name) {
			throw new TodoListNameRequiredError();
		}
		return new TodoListAggregateRoot(props);
	}
}