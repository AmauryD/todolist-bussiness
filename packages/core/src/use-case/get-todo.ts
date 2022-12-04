import { Todo } from "../interfaces/entities/todo.js";
import { TodoReadRepositoryInterface } from "../interfaces/repositories/todo-read.js";
import { GetTodoUseCaseInterface } from "../interfaces/use-case/get-todo.js";

export class GetOneTodoUseCase implements GetTodoUseCaseInterface {
    constructor(
        public todoRepository : TodoReadRepositoryInterface
    ) {}

    execute(todoId: string): Promise<Todo> {
        return this.todoRepository.getTodo(todoId);
    }
}