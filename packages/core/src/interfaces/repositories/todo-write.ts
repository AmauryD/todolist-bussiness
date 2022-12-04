import { Todo } from "../entities/todo.js";

export interface TodoWriteRepositoryInterface {
    createTodo(todo: Todo): Todo | Promise<Todo>;
}   