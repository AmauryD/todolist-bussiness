import { Todo } from "../entities/todo.js";
import { UseCaseInterface } from "../use-case";

export interface GetTodoUseCaseInterface extends UseCaseInterface {
    execute(todoId: string): Promise<Todo>;
}