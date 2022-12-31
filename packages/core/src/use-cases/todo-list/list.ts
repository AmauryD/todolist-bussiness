
import Result, { ok } from "true-myth/result";
import { CannotAccessTodoListError } from "../../domain/todos/errors/cannot-access-todo-list.js";
import { TodoListRepositoryInterface } from "../../domain/todos/repositories/todo-list.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";
import { TodoListSnapshot, TodoListAggregateRoot } from "../../index.js";
import { PresenterInterface } from "../../domain/shared/presenters/presenter.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface,
		private presenter: PresenterInterface<TodoListSnapshot[]>
	) {}

	public async execute(): Promise<Result<unknown, CannotAccessTodoListError>> {
		const list: TodoListAggregateRoot[] = (await this.todoListRepository.list()).unwrapOr([]);

		const presented = await this.presenter.present(list.map((e) => e.snapshot()));

		return ok(presented);
	}
}