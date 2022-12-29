import { EntityInterface } from "../../shared/entities/entity.js";
import { TodoTitleRequiredError } from "../errors/todo-title-required.js";

export interface TodoPropertiesInterface {
    title: string;
    isDone: boolean;
    id: string;
}

export interface TodoSnapshot {
	id: string,
    title: string,
	isDone: boolean
}

export class Todo implements EntityInterface<TodoSnapshot> {
	private constructor(private props: TodoPropertiesInterface) {}

	public get title() {
		return this.props.title;
	} 

	public get isDone() {
		return this.props.isDone;
	}
    
	public get id() {
		return this.props.id;
	}

	public static create(props: TodoPropertiesInterface) {
		if (!props.title) {
			throw new TodoTitleRequiredError();
		}
		return new Todo(props);
	}

	public snapshot() {
		return {
			id: this.id,
			isDone: this.isDone,
			title: this.title
		};
	}
}