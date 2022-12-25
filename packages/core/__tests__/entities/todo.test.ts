import { Todo } from "../../src/entities/todo.js";
import { TodoTitleRequiredError } from "../../src/errors/todo-title-required.js";
import { it } from "node:test";
import assert from "node:assert";

it("Throws an error when todo title is not provided", () => {
	assert.throws(() => Todo.create({ title: undefined } as never),TodoTitleRequiredError);
});

it("Creates a snapshot of a todo-list", () => {
	const todo = Todo.create({
		title: "bonjour",
		id: "2",
		isDone: false
	});
	assert.deepStrictEqual(todo.snapshot(),{
		id: "2",
		title: "bonjour",
		isDone: false
	});
});