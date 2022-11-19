import { Todo } from "../entities/todo";

export interface TodoRepositoryInterface {
    createTodo(todo: Todo): Todo | Promise<Todo>;
    listTodos(): Promise<Todo[]>;
    getTodo(todoId: string): Promise<Todo>;
}