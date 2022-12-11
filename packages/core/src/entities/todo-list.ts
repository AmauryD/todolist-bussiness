import { TodoListNameRequiredError } from "../errors/todo-list-name-required.js";
import { EntityInterface } from "../interfaces/entity.js";
import { Todo, TodoPropertiesInterface, TodoSnapshot } from "./todo.js";

export interface TodoListProperties {
    id: string,
    name: string
}

export interface TodoListSnapshot {
	id: string,
    name: string,
	todos: TodoSnapshot[],
	isDone: boolean
}

export class TodoListAggregateRoot implements EntityInterface<TodoListSnapshot> {
	private _todos: Set<Todo> = new Set();

	private constructor(
        private props: TodoListProperties
	) {}

	public get name() {
		return this.props.name;
	}

	public get id() {
		return this.props.id;
	}

	public get todos(): ReadonlySet<Todo> {
		return this._todos;
	}

	public get isDone() {
		return [...this.todos.values()].every((todo) => todo.isDone);
	}

	public static create(props: TodoListProperties): TodoListAggregateRoot {
		if (!props.name) {
			throw new TodoListNameRequiredError();
		}
		return new TodoListAggregateRoot(props);
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

	public snapshot(): TodoListSnapshot {
		return {
			id: this.id,
			name: this.name,
			todos: [...this.todos.values()].map((todo) => todo.snapshot()),
			isDone: this.isDone
		};
	}
}