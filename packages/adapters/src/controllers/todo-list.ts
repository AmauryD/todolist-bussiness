import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";
import { CannotAccessTodoListError } from "todo-domain/src/domain/todos/errors/cannot-access-todo-list.js";
import { Result } from "true-myth";

export interface TodoListWeb {
	name: string;
}

export class TodoListController {
	public constructor(
		private listTodoListsUseCase: ListTodoListsUseCase,
		private createTodoListUseCase: CreateTodoListUseCase
	) {}

	public async list(): Promise<Result<unknown, CannotAccessTodoListError>> {
		const todos = await this.listTodoListsUseCase.execute();
		return todos;
	}

	public async create(todoList: TodoListWeb): Promise<Result<unknown, Error>> {
		const todos = await this.createTodoListUseCase.execute(todoList);
		return todos;
	}
}