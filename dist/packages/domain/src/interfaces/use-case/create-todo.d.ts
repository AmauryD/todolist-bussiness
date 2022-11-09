import { UseCaseInterface } from "../use-case";
export interface CreateTodoRequest {
    id: string;
    title: string;
    done: boolean;
}
export interface CreateTodoResponse {
}
export interface CreateTodoUseCaseInterface extends UseCaseInterface {
    execute(todo: CreateTodoRequest): CreateTodoResponse;
}
