import { IdGeneratorInterface } from "../../src/interfaces/id-generator.js";
import { CreateTodoListUseCase } from "../../src/use-cases/todo-list/create.js";
import { FakeTodoListRepository } from "./common.js";
import { test } from "node:test";
import assert from "node:assert";
import { unwrapOr } from "true-myth/result";

class IdGenerator implements IdGeneratorInterface {
	public generate(): string {
		return "1";
	}
}

test("It creates a todo-list", async () => {
	const createTodoListUseCase = new CreateTodoListUseCase(
		new IdGenerator(),
		new FakeTodoListRepository(),
		{
			async present(data) { return data; }
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