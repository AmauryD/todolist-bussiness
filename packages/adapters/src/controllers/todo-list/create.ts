
import { CreateTodoListUseCase } from "todo-domain/index.js";
import { Result } from "true-myth";

export interface TodoListWeb {
	name: string;
}

export class TodoListWebCreateController {
	public constructor(
		private createTodoListUseCase: CreateTodoListUseCase
	) {}

	public async create(todoList: TodoListWeb): Promise<Result<unknown, Error>> {
		const todos = await this.createTodoListUseCase.execute(todoList);
		return todos;
	}
}


