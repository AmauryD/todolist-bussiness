import Result, { err, ok } from "true-myth/result";
import { ValueObject } from "../../shared/value-objects/value-object.js";
import { TodoListNameNotEmptyError } from "../errors/todo-list-name-not-empty.js";

export class TodoListName extends ValueObject {
	private constructor(
        public readonly value: string
	) {
		super();
	}

	public static create(value: string): Result<TodoListName, TodoListNameNotEmptyError> {
		if (!value) {
			return err(new TodoListNameNotEmptyError());
		}
        
		const name = new TodoListName(value);
		return ok(name);
	}

	public equals(other: this): boolean {
		return other.value === this.value;
	}
}