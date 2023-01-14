
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { TodoListRepositoryInterface } from "../../repositories/todo-list.js";
import { TodoListsPresenterInterface } from "../../presenters/todo-lists.js";
import { Identifier } from "../../../../index.js";
import { Maybe } from "true-myth";
import { TodoListErrorPresenterInterface } from "../../presenters/errors/todo-list.js";
import { UserRequiredError } from "../../errors/user-required.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface,
		private presenter: TodoListsPresenterInterface,
		private errorPresenter: TodoListErrorPresenterInterface
	) {}

	public async execute(userId: Maybe<string>) {
		if (userId.isNothing) {
			return this.errorPresenter.present(new UserRequiredError()); 
		}

		const userIdentifier = Identifier.create(userId.value);

		const list = await this.todoListRepository.listForUser(userIdentifier);

		return this.presenter.present(list.unwrapOr([]));
	}
}