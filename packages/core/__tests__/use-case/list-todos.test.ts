import { ListTodoListsUseCase } from "../../src/use-cases/todo-list/list.js";
import { FakeTodoListRepository } from "./common.js";
import { it } from "node:test";
import assert from "node:assert";

it("Lists todo-lists", async () => {
	const listTodoListsUseCase = new ListTodoListsUseCase(
		new FakeTodoListRepository()
	);

	assert.deepStrictEqual(await listTodoListsUseCase.execute(), [{
		id: "1",
		name: "title",
		isDone: true,
		todos: []
	}]);
});