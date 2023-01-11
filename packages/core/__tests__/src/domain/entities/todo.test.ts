
import { TodoTitleRequiredError } from "../../../../src/domain/todos/errors/todo-title-required.js";
import { it } from "node:test";
import assert from "node:assert";
import { Todo } from "../../../../src/domain/todos/entities/todo.js";
import { Identifier } from "../../../../src/domain/shared/value-objects/identifier.js";
import { assertError } from "../../../utils/assert-error.js";
import { Ok } from "true-myth/result";

it("Throws an error when todo title is not provided", () => {
	assertError(Todo.create({ title: undefined } as never),TodoTitleRequiredError);
});

it("Creates a snapshot of a todo-list", () => {
	const todo = Todo.create({
		title: "bonjour",
		id: Identifier.create("2"),
		isDone: false
	}) as Ok<Todo, never>;
	
	assert.deepStrictEqual(todo.value.snapshot(),{
		id: "2",
		title: "bonjour",
		isDone: false
	});
});