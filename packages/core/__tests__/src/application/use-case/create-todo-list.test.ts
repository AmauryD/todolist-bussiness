import { CreateTodoListUseCase } from "../../../../src/application/todos/use-cases/create/use-case.js";
import { FakeTodoListRepository } from "./common.js";
import { test } from "node:test";
import assert from "node:assert";
import { unwrapOr } from "true-myth/result";
import { FakeIdGenerator } from "../../../fixtures/id-generator.js";


test("It creates a todo-list", async () => {
	const createTodoListUseCase = new CreateTodoListUseCase(
		new FakeIdGenerator(),
		new FakeTodoListRepository(),
		{
			async present(data) { return data.snapshot(); }
		}
	);
	const todoSnapshot = await createTodoListUseCase.execute({
		name: "name"
	});
	assert.deepStrictEqual(unwrapOr({},todoSnapshot),{
		name: "name",
		id: "1",
		todos: [],
		isDone: true
	});
});