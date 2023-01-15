import { Collection, EntitySchema, ReferenceType } from "@mikro-orm/core";
import { Todo } from "./todo.js";

export interface TodoListModel {
    title: string;
    id: string;
    todos: Collection<Todo>
}

export const todoListSchema = new EntitySchema<TodoListModel>({
	name: "TodoList",
	properties: {
		id: { type: "string", primary: true },
		title: { type: "string" },
		todos: { reference: ReferenceType.ONE_TO_MANY, entity: "Todo", mappedBy: "todoList" },
	},
});