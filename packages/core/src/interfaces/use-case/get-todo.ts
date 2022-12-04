import { UseCaseInterface } from "../use-case";

export interface GetTodoUseCaseInputInterface {}

export interface GetTodoUseCaseOutputInterface {}

export interface GetTodoUseCaseInterface extends UseCaseInterface {
    execute(input: GetTodoUseCaseInputInterface): Promise<GetTodoUseCaseOutputInterface>;
}