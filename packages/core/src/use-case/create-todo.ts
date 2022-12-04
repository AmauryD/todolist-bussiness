import { TodoReadRepositoryInterface } from "../interfaces/repositories/todo-read";
import { CreateTodoInputInterface, CreateTodoOutputInterface, CreateTodoUseCaseInterface } from "../interfaces/use-case/create-todo";

export class CreateTodoUseCase implements CreateTodoUseCaseInterface  {
    constructor(
        public repository: TodoReadRepositoryInterface
    ) {}

    async execute(todo: CreateTodoInputInterface): Promise<CreateTodoOutputInterface> {
        return this.repository.createTodo(todo);
    }
}