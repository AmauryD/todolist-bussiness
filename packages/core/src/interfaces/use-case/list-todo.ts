import { Todo } from "../entities/todo.js";
import { UseCaseInterface } from "../use-case";

export interface ListTodoUseCaseOutputInterface {}

export interface ListTodoUseCaseInterface extends UseCaseInterface {
    execute(): Promise<ListTodoUseCaseOutputInterface[]>;
}