import { TodoRepositoryInterface } from "../interfaces/repository/todo";
import { CreateTodoRequest, CreateTodoResponse, CreateTodoUseCaseInterface } from "../interfaces/use-case/create-todo";
export declare class CreateTodoUseCase implements CreateTodoUseCaseInterface {
    repository: TodoRepositoryInterface;
    constructor(repository: TodoRepositoryInterface);
    execute(todo: CreateTodoRequest): CreateTodoResponse;
}
