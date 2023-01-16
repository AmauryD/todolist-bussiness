import assert from "node:assert";
import { it } from "node:test";
import { Identifier, TodoListAggregateRoot } from "todo-domain/index.js";
import { Ok } from "true-myth/result";
import { TodoListWebPresenter } from "../../../src/presenters/todo-list.js";

it("Transforms a TodoListAggregateRoot to a ViewModel", () => {
	const todoList = TodoListAggregateRoot.create({
		name: "todo",
		id: Identifier.create("1"),
		ownerId: Identifier.create("1")
	}) as Ok<TodoListAggregateRoot, never>;
	const presenter = new TodoListWebPresenter();

	assert.deepEqual(presenter.present(todoList.value),{
		todoList: {
			name: "todo",
			id: "1",
			isDone: true,
			todos: []
		}
	}); 
});