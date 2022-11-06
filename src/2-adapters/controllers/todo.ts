import { CreateTodo, CreateTodoDS } from "../../1-application/interactors/todo/create";

export class TodoController {
    constructor(
        public createTodo: CreateTodo
    ) {}

    public create(todo: CreateTodoDS) {
        return this.createTodo.execute(todo);
    }
}