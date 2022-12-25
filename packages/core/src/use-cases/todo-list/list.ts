
import { TodoListRepositoryInterface } from "../../interfaces/repositories/todo-list.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";

export class ListTodoListsUseCase implements UseCaseInterface {
	public constructor(
        private todoListRepository: TodoListRepositoryInterface
	) {}

	public async execute() {
		const list = await this.todoListRepository.list();
		return list.unwrapOr([]).map((e) => e.snapshot());
	}
}