
import Result, { err, ok } from "true-myth/result";
import { CannotAccessTodoListError } from "../../domain/todos/errors/cannot-access-todo-list.js";
import { TodoListAuthorizerInterface } from "../../interfaces/authorizers/todo-list.js";
import { TodoListRepositoryInterface } from "../../domain/todos/repositories/todo-list.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";
import { TodoListSnapshot, TodoListAggregateRoot } from "../../index.js";
import { PresenterInterface } from "../../domain/shared/presenters/presenter.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface,
		private todoListAuthorizer: TodoListAuthorizerInterface,
		private presenter: PresenterInterface<TodoListSnapshot[]>
	) {}

	public async execute(userId: string): Promise<Result<unknown, CannotAccessTodoListError>> {
		const list: TodoListAggregateRoot[] = (await this.todoListRepository.list()).unwrapOr([]);

		for (const todo of list) {
			if (!await this.todoListAuthorizer.canUserAccessTodoList(userId, todo.id)) {
				return err(new CannotAccessTodoListError());
			}
		}

		const presented = await this.presenter.present(list.map((e) => e.snapshot()));

		return ok(presented);
	}
}