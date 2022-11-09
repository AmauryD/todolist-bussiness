import { Todo } from "~/domain/interfaces/entities/todo";
import { TodoRepositoryInterface } from "~/domain/interfaces/repository/todo";
export declare class TodoRepository implements TodoRepositoryInterface {
    constructor();
    createTodo(todo: Todo): Todo;
}
