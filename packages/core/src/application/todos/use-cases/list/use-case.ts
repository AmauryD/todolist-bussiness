
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { TodoListRepositoryInterface } from "../../repositories/todo-list.js";
import { TodoListsPresenterInterface } from "../../presenters/todo-lists.js";
import { Identifier } from "../../../../index.js";
import { TodoListErrorPresenterInterface } from "../../presenters/errors/todo-list.js";
import { UserRequiredError } from "../../errors/user-required.js";
import { ListTodoListsUseCaseInput } from "./input.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface,
		private presenter: TodoListsPresenterInterface,
		private errorPresenter: TodoListErrorPresenterInterface
	) {}

	public async execute(input: ListTodoListsUseCaseInput) {
		if (!input.userId) {
			return this.errorPresenter.present(new UserRequiredError()); 
		}

		const userIdentifier = Identifier.create(input.userId);

		const list = await this.todoListRepository.listForUser(userIdentifier);

		return this.presenter.present(list.unwrapOr([]));
	}
}