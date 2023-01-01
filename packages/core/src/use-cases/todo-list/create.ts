import { IdGeneratorInterface } from "../../interfaces/id-generator.js";
import { TodoListRepositoryInterface } from "../../domain/todos/repositories/todo-list.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";
import { PresenterInterface } from "../../domain/shared/presenters/presenter.js";
import { TodoListSnapshot } from "../../index.js";
import { Result } from "true-myth";
import { ok } from "true-myth/result";



interface CreateTodoListUseCaseInputInterface {
	name: string
}

export class CreateTodoListUseCase implements UseCaseInterface {
	public constructor(
		private idGenerator: IdGeneratorInterface,
		private todoListRepository: TodoListRepositoryInterface,
		private todoListPresenter: PresenterInterface<TodoListSnapshot>
	) {}

	public async execute(todoListInput: CreateTodoListUseCaseInputInterface): Promise<Result<unknown, Error>> {
		const generatedId = this.idGenerator.generate();

		if (generatedId.isErr) {
			return generatedId;
		}

		const todoList =  await this.todoListRepository.create({
			name: todoListInput.name,
			id: generatedId.value
		});

		if (todoList.isErr) {
			return todoList;
		}

		const presented = await this.todoListPresenter.present(todoList.value.snapshot());
		
		return ok(presented);
	}
}