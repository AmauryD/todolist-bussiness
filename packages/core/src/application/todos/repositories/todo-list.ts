import { Result } from "true-myth";
import { TodoListAggregateRoot, TodoListProperties } from "../../../domain/todos/entities/todo-list.js";
import { Identifier } from "../../../index.js";

export interface TodoListRepositoryInterface {
    create(structure: TodoListProperties) :  Promise<Result<TodoListAggregateRoot,Error>>;
    listForUser(userId: Identifier): Promise<Result<TodoListAggregateRoot[],Error>>;
}