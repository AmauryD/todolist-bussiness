import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";

export interface TodoListWeb {
	name: string;
}

export class TodoListController {
	public constructor(
		private listTodoListsUseCase: ListTodoListsUseCase,
		private createTodoListUseCase: CreateTodoListUseCase
	) {}

	public list() {
		const todos = this.listTodoListsUseCase.execute();
		return todos;
	}

	public create(todoList: TodoListWeb) {
		const todos = this.createTodoListUseCase.execute(todoList);
		return todos;
	}
}