
import { TodoListRepositoryInterface } from "../../repositories/todo-list.js";
import { TodoListPresenterInterface } from "../../presenters/todo-list.js";
import { IdGeneratorInterface } from "../../../shared/interfaces/id-generator.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { CreateTodoListUseCaseInput } from "./request.js";
import { TodoListErrorPresenterInterface } from "../../presenters/errors/todo-list.js";

export class CreateTodoListUseCase implements UseCaseInterface {
	public constructor(
		private idGenerator: IdGeneratorInterface,
		private todoListRepository: TodoListRepositoryInterface,
		private todoListPresenter: TodoListPresenterInterface,
		private todoListErrorPresenter: TodoListErrorPresenterInterface
	) {}

	public async execute(todoListInput: CreateTodoListUseCaseInput) {
		const generatedId = this.idGenerator.generate();

		const todoList =  await this.todoListRepository.create({
			name: todoListInput.name,
			id: generatedId
		});

		if (todoList.isErr) {
			return this.todoListErrorPresenter.present(todoList.error);
		}

		return this.todoListPresenter.present(todoList.value);
	}
}