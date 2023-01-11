
import { beforeEach, it } from "node:test";
import assert from "node:assert";
import { TodoListAggregateRoot } from "../../../../src/domain/todos/entities/todo-list.js";
import { Identifier } from "../../../../src/domain/shared/value-objects/identifier.js";
import { assertError } from "../../../utils/assert-error.js";
import { TodoListNameRequiredError } from "../../../../src/domain/index.js";
import { Ok } from "true-myth/result";
import { TodoCreatedEvent } from "../../../../src/domain/todos/events/todo-created.js";

let todoList : TodoListAggregateRoot;

const todoStructure = {
	isDone: true,
	title: "title",
	id: Identifier.create("2")
};

beforeEach(() => {
	const todoListCreationResult = TodoListAggregateRoot.create({
		id: Identifier.create("1"),
		name: "Coucou"
	}) as Ok<TodoListAggregateRoot, never>;
	todoList = todoListCreationResult.value;
});

it("Throws an error when todo-list name is not provided", () => {
	assertError(TodoListAggregateRoot.create({ name: undefined } as never),TodoListNameRequiredError);
});

it("Creates a todo-list with title and id", () => {
	assert.strictEqual(todoList.name, "Coucou");
	assert.strictEqual(todoList.id.value, "1");
});

it("Adds todo to todoList", () => {
	todoList.addTodo(todoStructure);
	assert.strictEqual(todoList.todos.size, 1);
});

it("Deletes a task by its id", () => {
	todoList.addTodo(todoStructure);
	assert.strictEqual(todoList.todos.size,1);
	todoList.removeTodo(todoStructure.id);
	assert.strictEqual(todoList.todos.size, 0);
});

it("has a value of done when all sub-tasks are done", () => {
	todoList.addTodo(todoStructure);
	assert.strictEqual(todoList.isDone, true);
});

it("has a value of not done when all sub-tasks are not done", () => {
	todoList.addTodo({...todoStructure, isDone: false });
	assert.strictEqual(todoList.isDone,false);
});


it("Adds TodoCreatedEvent when a todo is added to todoList", () => {
	todoList.addTodo({...todoStructure, isDone: false });
	assert.strictEqual(todoList.domainEvents.length, 2);
	assert.strictEqual(todoList.domainEvents[1].constructor, TodoCreatedEvent);
	assert.strictEqual(todoList.domainEvents[1].getId(), todoStructure.id.value);
});


it("Creates a snapshot of a todo-list", () => {
	assert.deepStrictEqual(todoList.snapshot(), {
		id: "1",
		name: "Coucou",
		isDone: true,
		todos: []
	});
});