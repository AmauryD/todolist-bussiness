
import { ListTodoListsUseCase } from "todo-domain";
import { Maybe } from "true-myth";
import { TodoListsWebPresenter } from "../../index.js";
import { throwIfWebErrorOrReturn } from "../../utils/throw-or-return.js";

type PresentersResult = ReturnType<TodoListsWebPresenter["present"]>;

export class TodoListWebListController {
	public constructor(
		private listTodoListsUseCase: ListTodoListsUseCase
	) {}

	public async list(userId?: string) {
		const todos = await this.listTodoListsUseCase.execute(Maybe.of(userId)) as PresentersResult;
		return throwIfWebErrorOrReturn(todos);
	}
}