import { CreateTodoUseCaseInterface } from "todo-domain";
import { TodoWeb } from "../interfaces/models/todo-web";

export class TodoController {
    constructor(
        public createTodo: CreateTodoUseCaseInterface
    ) {}

    public create(todo: TodoWeb) {
        return this.createTodo.execute(todo);
    }
}