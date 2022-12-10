import { TodoListAggregateRoot, TodoListProperties } from "../../entities/todo-list.js";

export interface TodoListRepositoryInterface {
    create(structure: TodoListProperties) : Promise<TodoListAggregateRoot> | TodoListAggregateRoot;
    list(): Promise<TodoListAggregateRoot[]> | TodoListAggregateRoot[];
}