import { Collection, EntitySchema, ReferenceType } from "@mikro-orm/core";
import { Todo } from "./todo.js";

export interface TodoList {
    title: string;
    id: string;
    todos: Collection<Todo>
}

export const todoListSchema = new EntitySchema<TodoList>({
	name: "TodoList",
	properties: {
		id: { type: "string", primary: true },
		title: { type: "string" },
		todos: { reference: ReferenceType.ONE_TO_MANY, entity: "Todo", mappedBy: "todoList" },
	},
});