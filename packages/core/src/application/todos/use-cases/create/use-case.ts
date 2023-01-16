
import { TodoListRepositoryInterface } from "../../repositories/todo-list.js";
import { TodoListPresenterInterface } from "../../presenters/todo-list.js";
import { IdGeneratorInterface } from "../../../shared/interfaces/id-generator.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { CreateTodoListUseCaseInput } from "./input.js";
import { TodoListErrorPresenterInterface } from "../../presenters/errors/todo-list.js";
import { TodoListName } from "../../../../domain/todos/value-objects/todo-list-name.js";
import { Identifier } from "../../../../index.js";

export class CreateTodoListUseCase implements UseCaseInterface {
	public constructor(
		private idGenerator: IdGeneratorInterface,
		private todoListRepository: TodoListRepositoryInterface,
		private todoListPresenter: TodoListPresenterInterface,
		private todoListErrorPresenter: TodoListErrorPresenterInterface
	) {}

	public async execute(todoListInput: CreateTodoListUseCaseInput) {
		const generatedId = this.idGenerator.generate();
		const name = TodoListName.create(todoListInput.name);

		if (name.isErr) {
			return this.todoListErrorPresenter.present(name.error);
		}

		const todoList =  await this.todoListRepository.create({
			name: name.value.value,
			id: generatedId,
			ownerId: Identifier.create(todoListInput.userId)
		});

		if (todoList.isErr) {
			return this.todoListErrorPresenter.present(todoList.error);
		}

		return this.todoListPresenter.present(todoList.value);
	}
}