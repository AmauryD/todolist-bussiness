import Result, { err, ok } from "true-myth/result";
import { TodoListCreatedEvent } from "../events/todo-created.js";
import { AggregateRoot } from "../../shared/entities/aggregate-root.js";
import { Todo, TodoPropertiesInterface, TodoSnapshot } from "./todo.js";
import { TodoListNameRequiredError } from "../errors/todo-list-name-required.js";

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

export class TodoListAggregateRoot extends AggregateRoot<TodoListSnapshot> {
	private _todos: Set<Todo> = new Set();

	private constructor(
        private props: TodoListProperties
	) {
		super();
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

	public get isDone() {
		return [...this.todos.values()].every((todo) => todo.isDone);
	}

	public static create(props: TodoListProperties): Result<TodoListAggregateRoot, TodoListNameRequiredError> {
		if (!props.name) {
			return err(new TodoListNameRequiredError());
		}

		const todoList = new TodoListAggregateRoot(props);

		todoList.addEvent(new TodoListCreatedEvent(todoList));

		return ok(todoList);
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

	public snapshot() {
		return {
			id: this.id,
			name: this.name,
			todos: [...this.todos.values()].map((todo) => todo.snapshot()),
			isDone: this.isDone
		};
	}
}