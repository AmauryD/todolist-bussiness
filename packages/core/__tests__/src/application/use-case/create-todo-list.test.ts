import { CreateTodoListUseCase } from "../../../../src/application/todos/use-cases/create/use-case.js";
import { FakeTodoListRepository } from "./common.js";
import { test } from "node:test";
import assert from "node:assert";
import { FakeIdGenerator } from "../../../fixtures/id-generator.js";


test("It creates a todo-list", async () => {
	const createTodoListUseCase = new CreateTodoListUseCase(
		new FakeIdGenerator(),
		new FakeTodoListRepository(),
		{
			async present(data) { return data.snapshot(); }
		},
		{
			present(error) {
				return error;
			},
		}
	);
	const todoSnapshot = await createTodoListUseCase.execute({
		name: "name",
		userId: "1"
	});
	assert.deepStrictEqual(todoSnapshot,{
		name: "name",
		id: "1",
		todos: [],
		isDone: true
	});
});