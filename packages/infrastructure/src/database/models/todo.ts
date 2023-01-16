import { EntitySchema, ReferenceType } from "@mikro-orm/core";

export interface TodoModel {
    name: string;
    isDone: boolean;
    id: string;
}

export const todoSchema = new EntitySchema<TodoModel>({
	name: "Todo",
	properties: {
		id: { type: "string", primary: true },
		title: { type: "string" },
		todoList: { reference: ReferenceType.MANY_TO_ONE, entity: "TodoList", inversedBy: "todos" },
	},
});