
import Result, { err, ok } from "true-myth/result";
import { TodoListAggregateRoot, TodoListSnapshot } from "../../entities/todo-list.js";
import { CannotAccessTodoListError } from "../../errors/cannot-access-todo-list.js";
import { TodoListAuthorizerInterface } from "../../interfaces/authorizers/todo-list.js";
import { TodoListRepositoryInterface } from "../../interfaces/repositories/todo-list.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface,
		private todoListAuthorizer: TodoListAuthorizerInterface
	) {}

	public async execute(userId: string): Promise<Result<TodoListSnapshot[], CannotAccessTodoListError>> {
		const list: TodoListAggregateRoot[] = (await this.todoListRepository.list()).unwrapOr([]);
		for (const todo of list) {
			if (!await this.todoListAuthorizer.canUserAccessTodoList(userId, todo.id)) {
				return err(new CannotAccessTodoListError());
			}
		}
		return ok(list.map((e) => e.snapshot()));
	}
}