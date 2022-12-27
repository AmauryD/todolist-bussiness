import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";
import { CannotAccessTodoListError } from "todo-domain/errors/cannot-access-todo-list.js";
import { Result } from "true-myth";
import { ok } from "true-myth/result";
import { SerializerInterface } from "../interfaces/serializer.interface.js";

export interface TodoListWeb {
	name: string;
}

export class TodoListController {
	public constructor(
		private listTodoListsUseCase: ListTodoListsUseCase,
		private createTodoListUseCase: CreateTodoListUseCase,
		private serializer: SerializerInterface
	) {}

	public async list(userId: string): Promise<Result<unknown, CannotAccessTodoListError>> {
		const todos = await this.listTodoListsUseCase.execute(userId);
		if (todos.isErr) {
			return todos;
		}
		return ok(this.serializer.serialize(todos.value));
	}

	public async create(todoList: TodoListWeb): Promise<Result<unknown, Error>> {
		const todos = await this.createTodoListUseCase.execute(todoList);
		if (todos.isErr) {
			return todos;
		}
		return ok(this.serializer.serialize(todos.value.snapshot()));
	}
}