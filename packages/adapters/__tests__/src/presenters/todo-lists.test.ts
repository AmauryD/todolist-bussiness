import assert from "node:assert";
import { it } from "node:test";
import { TodoListAggregateRoot, Identifier } from "todo-domain/index.js";
import { Ok } from "true-myth/result";
import { TodoListsWebPresenter } from "../../../src/presenters/todo-lists.js";


it("Transforms a TodoListAggregateRoot to a ViewModel", () => {
	const todoList = TodoListAggregateRoot.create({
		name: "todo",
		id: Identifier.create("1"),
		ownerId: Identifier.create("1")
	}) as Ok<TodoListAggregateRoot, never>;
	const presenter = new TodoListsWebPresenter();

	assert.deepEqual(presenter.present([todoList.value]),{
		todoList: [{
			name: "todo",
			id: "1",
			isDone: true,
			todos: []
		}]
	}); 
});