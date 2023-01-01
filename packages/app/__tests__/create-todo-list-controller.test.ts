import "reflect-metadata";
import assert from "node:assert";
import test, { afterEach, beforeEach, it } from "node:test";
import { container } from "tsyringe";
import { TodoListController } from "../src/controllers/todo-list.controller.js";
import { setupDI } from "../src/setup-di.js";
import { MikroORM } from "@mikro-orm/core";
import { init } from "@triptyk/nfw-mikro-orm";
import { todoListSchema } from "../src/database/models/todo-list.js";
import { todoSchema } from "../src/database/models/todo.js";
import { err, ok } from "true-myth/result";
import { BodyMustNotBeEmptyError } from "../src/errors/body-must-not-be-empty.js";
import { ValidationError } from "yup";
import { userSchema } from "../src/database/models/user.js";

let controller: TodoListController;

beforeEach(async () => {
	await init({
		type: "sqlite",
		dbName: ":memory:",
		entities: [todoSchema, todoListSchema, userSchema],
		allowGlobalContext: true
	});
	await setupDI();
	await container.resolve(MikroORM).getSchemaGenerator().updateSchema();
	controller = container.resolve(TodoListController);
});

test("Creates a todo-list", async () => {
	const todoLists: any = await controller.create(ok({
		name: "Coucou"
	}));
	assert.strictEqual(todoLists.todoLists.name, "Coucou");
});

it("Rejects when bad result", async () => {
	await assert.rejects(controller.create(err(new BodyMustNotBeEmptyError())), BodyMustNotBeEmptyError);
});

it("Rejects when validation error", async () => {
	await assert.rejects(controller.create(err(new ValidationError("truc"))), ValidationError);
});

afterEach(async () => {
	await container.resolve(MikroORM).close(true);
});