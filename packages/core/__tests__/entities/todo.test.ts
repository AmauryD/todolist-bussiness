import { Todo } from "../../src/entities/todo.js";
import { TodoTitleRequiredError } from "../../src/errors/todo-title-required.js";

it("Throws an error when todo title is not provided", () => {
	expect(() => Todo.create({ title: undefined } as never)).toThrowError(TodoTitleRequiredError);
});

it("Creates a snapshot of a todo-list", () => {
	const todo = Todo.create({
		title: "bonjour",
		id: "2",
		isDone: false
	});
	expect(todo.snapshot()).toStrictEqual({
		id: "2",
		title: "bonjour",
		isDone: false
	});
});