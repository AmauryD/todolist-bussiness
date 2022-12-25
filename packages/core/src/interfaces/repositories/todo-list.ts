import { Result } from "true-myth";
import { TodoListAggregateRoot, TodoListProperties } from "../../entities/todo-list.js";

export interface TodoListRepositoryInterface {
    create(structure: TodoListProperties) :  Promise<Result<TodoListAggregateRoot,Error>>;
    list(): Promise<Result<TodoListAggregateRoot[],Error>>;
}