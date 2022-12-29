import { IdGeneratorInterface } from "../../interfaces/id-generator.js";
import { TodoListRepositoryInterface } from "../../domain/todos/repositories/todo-list.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";

interface CreateTodoListUseCaseInputInterface {
	name: string
}

export class CreateTodoListUseCase implements UseCaseInterface {
	public constructor(
		private idGenerator: IdGeneratorInterface,
		private todoListRepository: TodoListRepositoryInterface
	) {}

	public async execute(todoListInput: CreateTodoListUseCaseInputInterface) {
		const todoList =  this.todoListRepository.create({
			name: todoListInput.name,
			id: this.idGenerator.generate()
		});
		return todoList;
	}
}