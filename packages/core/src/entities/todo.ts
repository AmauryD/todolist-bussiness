import { TodoTitleRequiredError } from "../errors/todo-title-required.js";

export interface TodoPropertiesInterface {
    title: string;
    isDone: boolean;
    id: string;
}

export class Todo {
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
}