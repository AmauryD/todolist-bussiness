import { Todo } from "../interfaces/entities/todo.js";
import { TodoRepositoryInterface } from "../interfaces/repository/todo.js";
import { GetTodoUseCaseInterface } from "../interfaces/use-case/get-todo.js";

export class GetOneTodoUseCase implements GetTodoUseCaseInterface {
    constructor(
        public todoRepository : TodoRepositoryInterface
    ) {}

    execute(todoId: string): Promise<Todo> {
        return this.todoRepository.getTodo(todoId);
    }
}