import { RequiredEntityData } from "@mikro-orm/core";

import { Identifier, TodoListAggregateRoot } from "todo-domain";
import Result, { ok } from "true-myth/result";
import { TodoListModel } from "../models/todo-list.js";
import { DataMapper } from "./mapper.js";

export class TodoListMapper implements DataMapper<TodoListAggregateRoot,RequiredEntityData<TodoListModel>> {
	public toDomain(todoList: TodoListModel): Result<TodoListAggregateRoot, Error> {
		const todo = TodoListAggregateRoot.create({
			id: Identifier.create(todoList.id),
			name: todoList.title,
			ownerId: Identifier.create(todoList.owner.id)
		});

		return todo;
	}

	public toPersistence(todo: TodoListAggregateRoot): Result<RequiredEntityData<TodoListModel>, Error> {
		return ok({
			id: todo.id.value,
			title: todo.name,
			owner: todo.ownerId.value
		});
	}
}