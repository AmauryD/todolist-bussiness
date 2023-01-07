
import { TodoListRepositoryInterface } from "../repositories/todo-list.js";
import { TodoListPresenterInterface } from "../presenters/todo-list.js";
import { Result } from "true-myth";
import { ok } from "true-myth/result";
import { IdGeneratorInterface } from "../../shared/interfaces/id-generator.js";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";

interface CreateTodoListUseCaseInputInterface {
	name: string
}

export class CreateTodoListUseCase implements UseCaseInterface {
	public constructor(
		private idGenerator: IdGeneratorInterface,
		private todoListRepository: TodoListRepositoryInterface,
		private todoListPresenter: TodoListPresenterInterface
	) {}

	public async execute(todoListInput: CreateTodoListUseCaseInputInterface): Promise<Result<unknown, Error>> {
		const generatedId = this.idGenerator.generate();

		const todoList =  await this.todoListRepository.create({
			name: todoListInput.name,
			id: generatedId
		});

		if (todoList.isErr) {
			return todoList;
		}

		const presented = await this.todoListPresenter.present(todoList.value);
		
		return ok(presented);
	}
}