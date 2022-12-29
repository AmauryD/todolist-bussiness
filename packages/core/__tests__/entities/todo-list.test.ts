
import { beforeEach, it } from "node:test";
import assert from "node:assert";
import { TodoListAggregateRoot } from "../../src/domain/todos/entities/todo-list.js";

let todoList : TodoListAggregateRoot;
const todoStructure = {
	isDone: true,
	title: "title",
	id: "2"
};

beforeEach(() => {
	const todoListCreationResult = TodoListAggregateRoot.create({
		id: "1",
		name: "Coucou"
	});
	todoList = todoListCreationResult.unwrapOrElse(() => undefined as never);
});

it("Throws an error when todo-list name is not provided", () => {
	assert.strictEqual(TodoListAggregateRoot.create({ name: undefined } as never).isErr, true);
});

it("Creates a todo-list with title and id", () => {
	assert.strictEqual(todoList.name, "Coucou");
	assert.strictEqual(todoList.id,"1");
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

it("Creates a snapshot of a todo-list", () => {
	assert.deepStrictEqual(todoList.snapshot(), {
		id: "1",
		name: "Coucou",
		isDone: true,
		todos: []
	});
});