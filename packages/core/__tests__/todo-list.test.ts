import { TodoListAggregateRoot } from "../src/entities/todo-list.js";
import { TodoListNameRequiredError } from "../src/errors/todo-list-name-required.js";

let todoList : TodoListAggregateRoot;
const todoStructure = {
	isDone: true,
	title: "title",
	id: "2"
};

beforeEach(() => {
	todoList = TodoListAggregateRoot.create({
		id: "1",
		name: "Coucou"
	});
});

it("Throws an error when todo-list name is not provided", () => {
	expect(() => TodoListAggregateRoot.create({ name: undefined } as any)).toThrowError(TodoListNameRequiredError);
});

it("Creates a todo-list with title and id", () => {
	expect(todoList.name).toStrictEqual("Coucou");
	expect(todoList.id).toStrictEqual("1");
});

it("Adds todo to todoList", () => {
	todoList.addTodo(todoStructure);
	expect(todoList.todos.size).toStrictEqual(1);
});

it("Deletes a task by its id", () => {
	todoList.addTodo(todoStructure);
	expect(todoList.todos.size).toStrictEqual(1);
	todoList.removeTodo(todoStructure.id);
	expect(todoList.todos.size).toStrictEqual(0);
});

it("has a value of done when all sub-tasks are done", () => {
	todoList.addTodo(todoStructure);
	expect(todoList.isDone()).toStrictEqual(true);
});

it("has a value of not done when all sub-tasks are not done", () => {
	todoList.addTodo({...todoStructure, isDone: false });
	expect(todoList.isDone()).toStrictEqual(false);
});
