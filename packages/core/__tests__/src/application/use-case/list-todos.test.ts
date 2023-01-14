
import { FakeTodoListRepository } from "./common.js";
import { it } from "node:test";
import assert from "node:assert";
import { ListTodoListsUseCase } from "../../../../src/application/todos/use-cases/list/use-case.js";

function createUseCase() {
	return new ListTodoListsUseCase(
		new FakeTodoListRepository(),
		{
			async present(data) {
				return data.map((e) => e.snapshot());
			},
		}
	);
}

it("Lists todo-lists", async () => {
	const listTodoListsUseCase = createUseCase();

	const list = await listTodoListsUseCase.execute();

	assert.deepStrictEqual(list, [{
		id: "1",
		name: "title",
		isDone: true,
		todos: []
	}]);
});
