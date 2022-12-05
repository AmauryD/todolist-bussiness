import { Todo } from "../src/entities/todo.js";
import { TodoTitleRequiredError } from "../src/errors/todo-title-required.js";

it("Throws an error when todo title is not provided", () => {
	expect(() => Todo.create({ title: undefined } as any)).toThrowError(TodoTitleRequiredError);
});