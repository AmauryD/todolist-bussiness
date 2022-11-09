import { Todo } from "../entities/todo";

export interface TodoRepositoryInterface {
    createTodo(todo: Todo): Todo;
}