import { Todo } from "../interfaces/entities/todo";
import { TodoRepositoryInterface } from "../interfaces/repository/todo";
import { CreateTodoRequest, CreateTodoUseCaseInterface } from "../interfaces/use-case/create-todo";

export class CreateTodoUseCase implements CreateTodoUseCaseInterface  {
    constructor(
        public repository: TodoRepositoryInterface
    ) {}

    async execute(todo: CreateTodoRequest): Promise<Todo> {
        return this.repository.createTodo(todo);
    }
}