import { TodoListAuthorizerInterface } from "../../src/interfaces/authorizers/todo-list.js";

export class SuccessAuthorizer implements TodoListAuthorizerInterface {
	public canUserAccessTodoList(): boolean | Promise<boolean> {
		return true;
	}
}