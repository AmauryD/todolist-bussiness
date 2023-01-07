import Result, { err, ok } from "true-myth/result";
import { EntityInterface } from "../../shared/entities/entity.js";
import { Identifier } from "../../shared/value-objects/identifier.js";
import { TodoTitleRequiredError } from "../errors/todo-title-required.js";

export interface TodoProperties {
    title: string;
    isDone: boolean;
    id: Identifier;
}

export interface TodoSnapshot {
	id: string,
    title: string,
	isDone: boolean
}

export class Todo implements EntityInterface<TodoSnapshot> {
	private constructor(private props: TodoProperties) {}

	public get title() {
		return this.props.title;
	} 

	public get isDone() {
		return this.props.isDone;
	}
    
	public get id() {
		return this.props.id;
	}

	public static create(props: TodoProperties): Result<Todo,TodoTitleRequiredError> {
		if (!props.title) {
			return err(new TodoTitleRequiredError());
		}
		return ok(new Todo(props));
	}

	public snapshot() {
		return {
			id: this.id.value,
			isDone: this.isDone,
			title: this.title
		};
	}
}