import { ListTodoListsUseCase } from "todo-domain";

export class TodoListController {
	public constructor(
		private listTodoUseCase: ListTodoListsUseCase
	) {}

	public list() {
		const todos = this.listTodoUseCase.execute();
		return todos;
	}
}