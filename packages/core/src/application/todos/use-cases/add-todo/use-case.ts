import { Result } from "true-myth";
import { err, ok } from "true-myth/result";
import { IdGeneratorInterface } from "../../../../index.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { TodoListNotFoundError } from "../../errors/todo-list-not-found.js";
import { TodoListRepositoryInterface } from "../../repositories/todo-list.js";
import { AddTodoToTodoListUseCaseInput } from "./input.js";

export class AddTodoToTodoListUseCase implements UseCaseInterface {
	public constructor(
		private todoListRepository: TodoListRepositoryInterface,
		private idGenerator: IdGeneratorInterface
	) {
	}

	public async execute(input: AddTodoToTodoListUseCaseInput): Promise<Result<void, Error>> {
		const todoList = await this.todoListRepository.findTodoListById(input.todoListId);

		if (todoList.isNothing) {
			return err(new TodoListNotFoundError());
		}

		todoList.value.addTodo({
			title: input.title,
			id: this.idGenerator.generate(),
			isDone: false
		});
		
		await this.todoListRepository.update(todoList.value);

		return ok<void, Error>(undefined);
	}
}