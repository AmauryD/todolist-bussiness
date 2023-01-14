
import { ListTodoListsUseCase } from "todo-domain";
import { TodoListsWebPresenter } from "../../index.js";
import { throwIfWebErrorOrReturn } from "../../utils/throw-or-return.js";

type PresentersResult = ReturnType<TodoListsWebPresenter["present"]>;

export class TodoListWebListController {
	public constructor(
		private listTodoListsUseCase: ListTodoListsUseCase
	) {}

	public async list() {
		const todos = await this.listTodoListsUseCase.execute() as PresentersResult;
		return throwIfWebErrorOrReturn(todos);
	}
}