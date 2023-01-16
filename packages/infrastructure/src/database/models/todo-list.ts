import { Collection, EntitySchema, IdentifiedReference, ReferenceType } from "@mikro-orm/core";
import { TodoModel } from "./todo.js";
import { UserModel } from "./user.js";

export interface TodoListModel {
    title: string;
    id: string;
    todos: Collection<TodoModel>,
	owner: IdentifiedReference<UserModel>,
}

export const todoListSchema = new EntitySchema<TodoListModel>({
	name: "TodoList",
	properties: {
		id: { type: "string", primary: true },
		title: { type: "string" },
		todos: { reference: ReferenceType.ONE_TO_MANY, entity: "Todo", mappedBy: "todoList" },
		owner: { reference: ReferenceType.MANY_TO_ONE, entity: "User", inversedBy: "todoLists" }
	},
});