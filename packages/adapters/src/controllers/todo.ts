import { CreateTodoRequest, CreateTodoUseCaseInterface } from "~/domain/interfaces/use-case/create-todo";

export class TodoController {
    constructor(
        public createTodo: CreateTodoUseCaseInterface
    ) {}

    public create(todo: CreateTodoRequest) {
        return this.createTodo.execute(todo);
    }
}