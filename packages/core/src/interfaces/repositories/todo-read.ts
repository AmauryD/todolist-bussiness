import { Todo } from "../entities/todo";

export interface TodoReadRepositoryInterface {
    listTodos(): Promise<Todo[]>;
    getTodo(todoId: string): Promise<Todo>;
}