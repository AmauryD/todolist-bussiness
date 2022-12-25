import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";
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

	public async list() {
		const todos = await this.listTodoListsUseCase.execute();
		return this.serializer.serialize(todos);
	}

	public async create(todoList: TodoListWeb) {
		const todos = await this.createTodoListUseCase.execute(todoList);
		if (todos.isErr) {
			return todos.error;
		}
		return this.serializer.serialize(todos.value.snapshot());
	}
}