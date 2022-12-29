
import { TodoTitleRequiredError } from "../../src/domain/todos/errors/todo-title-required.js";
import { it } from "node:test";
import assert from "node:assert";
import { Todo } from "../../src/domain/todos/entities/todo.js";

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