
import { CreateTodoListUseCase } from "todo-domain/index.js";
import { TodoListErrorPresenter } from "../../presenters/error/todo-list.js";
import { TodoListsWebPresenter } from "../../presenters/todo-lists.js";
import { throwIfWebErrorOrReturn } from "../../utils/throw-or-return.js";

export interface TodoListWeb {
	name: string;
	userId: string
}

type PresentersResult = ReturnType<TodoListsWebPresenter["present"]> | ReturnType<TodoListErrorPresenter["present"]>;

export class TodoListWebCreateController {
	public constructor(
		private createTodoListUseCase: CreateTodoListUseCase
	) {}

	public async create(todoList: TodoListWeb){
		const todos = await this.createTodoListUseCase.execute(todoList) as PresentersResult;
		return throwIfWebErrorOrReturn(todos);
	}
}


