
import { ListTodoListsUseCase, CannotAccessTodoListError } from "todo-domain";
import { Result } from "true-myth";

export class TodoListWebListController {
	public constructor(
		private listTodoListsUseCase: ListTodoListsUseCase
	) {}

	public async list(): Promise<Result<unknown, CannotAccessTodoListError>> {
		const todos = await this.listTodoListsUseCase.execute();
		return todos;
	}
}