import { container } from "@triptyk/nfw-core";
import { TodoListController } from "../src/controllers/todo-list.controller.js";

test("It lists todos", () => {
	const todoListController = container.resolve(TodoListController);
	expect(todoListController.list()).toStrictEqual([]);
});