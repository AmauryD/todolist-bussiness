import { TodoRepositoryInterface } from "../interfaces/repository/todo";
import { CreateTodoRequest, CreateTodoResponse, CreateTodoUseCaseInterface } from "../interfaces/use-case/create-todo";

export class CreateTodoUseCase implements CreateTodoUseCaseInterface  {
    constructor(
        public repository: TodoRepositoryInterface
    ) {}

    execute(todo: CreateTodoRequest): CreateTodoResponse {
        return this.repository.createTodo(todo);
    }
}