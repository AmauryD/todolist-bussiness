import { ListTodoListsUseCase } from "../../src/use-cases/todo-list/list.js";
import { FakeTodoListRepository } from "./common.js";
import { it } from "node:test";
import assert from "node:assert";

function createUseCase() {
	return new ListTodoListsUseCase(
		new FakeTodoListRepository(),
		{
			async present(data) {
				return data;
			},
		}
	);
}

it("Lists todo-lists", async () => {
	const listTodoListsUseCase = createUseCase();

	const list = await listTodoListsUseCase.execute();

	assert.strictEqual(list.isOk, true);
	assert.deepStrictEqual(list.unwrapOr([]), [{
		id: "1",
		name: "title",
		isDone: true,
		todos: []
	}]);
});
