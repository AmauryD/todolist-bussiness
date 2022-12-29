import { ListTodoListsUseCase } from "../../src/use-cases/todo-list/list.js";
import { FakeTodoListRepository } from "./common.js";
import { it } from "node:test";
import assert from "node:assert";
import { SuccessAuthorizer } from "../fixtures/success-authorizer.js";
import { Err } from "true-myth/result";
import { CannotAccessTodoListError } from "../../src/domain/todos/errors/cannot-access-todo-list.js";
import { TodoListAuthorizerInterface } from "../../src/interfaces/authorizers/todo-list.js";
import { FailureAuthorizer } from "../fixtures/failure-authorizer.js";

function createUseCaseWithAuthorizer(authorizer: TodoListAuthorizerInterface) {
	return new ListTodoListsUseCase(
		new FakeTodoListRepository(),
		authorizer
	);
}

it("Lists todo-lists", async () => {
	const listTodoListsUseCase = createUseCaseWithAuthorizer(new SuccessAuthorizer());

	const list = await listTodoListsUseCase.execute("someUser");

	assert.strictEqual(list.isOk, true);
	assert.deepStrictEqual(list.unwrapOr([]), [{
		id: "1",
		name: "title",
		isDone: true,
		todos: []
	}]);
});

it("Unauthorized list", async () => {
	const listTodoListsUseCase = createUseCaseWithAuthorizer(new FailureAuthorizer());

	const list = await listTodoListsUseCase.execute("someUser");

	assert.strictEqual(list.isErr, true);
	assert.strictEqual((list as Err<never, CannotAccessTodoListError>).error.constructor, CannotAccessTodoListError);
});

