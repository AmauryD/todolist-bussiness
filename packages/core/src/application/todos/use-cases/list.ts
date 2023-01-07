
import Result, { ok } from "true-myth/result";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { PresenterInterface } from "../../shared/presenters/presenter.js";
import { TodoListAggregateRoot } from "../../../domain/todos/entities/todo-list.js";
import { CannotAccessTodoListError } from "../../../domain/todos/errors/cannot-access-todo-list.js";
import { TodoListRepositoryInterface } from "../repositories/todo-list.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface,
		private presenter: PresenterInterface<TodoListAggregateRoot[]>
	) {}

	public async execute(): Promise<Result<unknown, CannotAccessTodoListError>> {
		const list: TodoListAggregateRoot[] = (await this.todoListRepository.list()).unwrapOr([]);

		const presented = await this.presenter.present(list);

		return ok(presented);
	}
}