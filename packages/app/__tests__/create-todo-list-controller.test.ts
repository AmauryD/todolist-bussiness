import "reflect-metadata";
import assert from "node:assert";
import test, { afterEach, beforeEach } from "node:test";
import { container } from "tsyringe";
import { TodoListController } from "../src/controllers/todo-list.controller.js";
import { setupDI } from "../src/setup-di.js";
import { MikroORM } from "@mikro-orm/core";
import { init } from "@triptyk/nfw-mikro-orm";
import { todoListSchema } from "../src/database/models/todo-list.js";
import { todoSchema } from "../src/database/models/todo.js";

beforeEach(async () => {
	await init({
		type: "sqlite",
		dbName: ":memory:",
		entities: [todoSchema, todoListSchema],
		allowGlobalContext: true
	});
	await setupDI();
	await container.resolve(MikroORM).getSchemaGenerator().updateSchema();
});

test("It creates a todo-list", async () => {
	const controller = container.resolve(TodoListController);
	const todoLists: any = await controller.create({
		name: "Coucou"
	});
	assert.strictEqual(todoLists.todoLists.name, "Coucou");
});

afterEach(async () => {
	await container.resolve(MikroORM).close(true);
});