import { CreateTodoUseCaseInterface } from "todo-domain";
import { ListTodoUseCaseInterface } from "todo-domain/src/interfaces/use-case/list-todo.js";
import { TodoWeb } from "../interfaces/models/todo-web";

export class TodoController {
    constructor(
        public createTodo: CreateTodoUseCaseInterface,
        public listTodo: ListTodoUseCaseInterface
    ) {}

    public create(todo: TodoWeb) {
        return this.createTodo.execute(todo);
    }

    public list() {
        return this.listTodo.execute();
    }
}