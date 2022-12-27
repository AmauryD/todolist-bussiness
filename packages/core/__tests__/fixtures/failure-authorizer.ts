import { TodoListAuthorizerInterface } from "../../src/interfaces/authorizers/todo-list.js";

export class FailureAuthorizer implements TodoListAuthorizerInterface {
	public canUserAccessTodoList(): boolean | Promise<boolean> {
		return false;
	}
}