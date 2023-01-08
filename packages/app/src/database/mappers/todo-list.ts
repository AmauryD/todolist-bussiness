import { RequiredEntityData } from "@mikro-orm/core";

import { Identifier, TodoListAggregateRoot } from "todo-domain/index.js";
import Result, { ok } from "true-myth/result";
import { TodoList } from "../models/todo-list.js";
import { DataMapper } from "./mapper.js";

export class TodoListMapper implements DataMapper<TodoListAggregateRoot,RequiredEntityData<TodoList>> {
	public toDomain(todoList: TodoList): Result<TodoListAggregateRoot, Error> {
		const todo = TodoListAggregateRoot.create({
			id: Identifier.create(todoList.id),
			name: todoList.title
		});

		return todo;
	}

	public toPersistence(todo: TodoListAggregateRoot): Result<RequiredEntityData<TodoList>, Error> {
		return ok({
			id: todo.id.value,
			title: todo.name
		});
	}
}