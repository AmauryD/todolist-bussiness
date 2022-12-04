import { UseCaseInterface } from "../use-case.js";

// this is an input port
export interface CreateTodoInputInterface {
    id: string,
    title: string,
    done: boolean
}

// this is an output port
export interface CreateTodoOutputInterface {
    id: string,
    title: string,
    done: boolean
}

// this is an interactor
export interface CreateTodoUseCaseInterface extends UseCaseInterface {
    execute(input: CreateTodoInputInterface): Promise<CreateTodoOutputInterface>;
}