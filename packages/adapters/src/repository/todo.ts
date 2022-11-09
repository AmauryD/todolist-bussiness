import { Todo } from "~/domain/interfaces/entities/todo";
import { TodoRepositoryInterface } from "~/domain/interfaces/repository/todo";

export class TodoRepository implements TodoRepositoryInterface {
    constructor() {}

    createTodo(todo: Todo): Todo {
        return {} as Todo
    }
}