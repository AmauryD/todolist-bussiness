import { Todo } from "../entities/todo";
import { UseCaseInterface } from "../use-case";

// this is an input port
export interface CreateTodoRequest {
    id: string,
    title: string,
    done: boolean
}

// this is an interactor
export interface CreateTodoUseCaseInterface extends UseCaseInterface {
    execute(todo: CreateTodoRequest): Todo;
}