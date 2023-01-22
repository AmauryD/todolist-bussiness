import { Maybe, Result } from "true-myth";
import { TodoListAggregateRoot } from "../../../domain/todos/entities/todo-list.js";
import { Identifier } from "../../../index.js";

export interface TodoListRepositoryInterface {
	create(structure: TodoListAggregateRoot) :  Promise<Result<void,Error>>;
	listForUser(userId: Identifier): Promise<Result<TodoListAggregateRoot[],Error>>;
	findTodoListById(todoListId: string): Promise<Maybe<TodoListAggregateRoot>>;
	update(todoList: TodoListAggregateRoot): Promise<void>;
}