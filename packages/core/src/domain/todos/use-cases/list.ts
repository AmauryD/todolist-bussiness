
import Result, { ok } from "true-myth/result";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { PresenterInterface } from "../../shared/presenters/presenter.js";
import { TodoListSnapshot, TodoListAggregateRoot } from "../entities/todo-list.js";
import { CannotAccessTodoListError } from "../errors/cannot-access-todo-list.js";
import { TodoListRepositoryInterface } from "../repositories/todo-list.js";

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