import { Todo } from "../entities/todo.js";
import { UseCaseInterface } from "../use-case";

export interface ListTodoUseCaseInterface extends UseCaseInterface {
    execute(): Promise<Todo[]>;
}