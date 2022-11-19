import { CreateTodoUseCaseInterface } from "todo-domain";
import { GetTodoUseCaseInterface } from "todo-domain/src/interfaces/use-case/get-todo.js";
import { ListTodoUseCaseInterface } from "todo-domain/src/interfaces/use-case/list-todo.js";
import { TodoWeb } from "../interfaces/models/todo-web";

export class TodoController {
    constructor(
        public createTodo: CreateTodoUseCaseInterface,
        public listTodo: ListTodoUseCaseInterface,
        public getTodo: GetTodoUseCaseInterface
    ) {}

    public create(todo: TodoWeb) {
        return this.createTodo.execute(todo);
    }

    public list() : Promise<TodoWeb[]> {
        return this.listTodo.execute();
    }

    public getOne(id: string) : Promise<TodoWeb> {
        return this.getTodo.execute(id);
    }
}