import assert from "node:assert";
import test from "node:test";
import { UserAlreadyExistsError } from "todo-domain";
import { WebError } from "../../../../src/index.js";
import { UserErrorPresenter } from "../../../../src/presenters/error/user.js";

test("An unknown Error for the Web must return error 500", () => {
	const errorPresenter = new UserErrorPresenter();
	const error = new Error();
	assert.deepStrictEqual(errorPresenter.present(error), new WebError(500, error));
});

test("UserAlreadyExistsError must return 409", () => {
	const errorPresenter = new UserErrorPresenter();
	const error = new UserAlreadyExistsError();
	assert.deepStrictEqual(errorPresenter.present(error), new WebError(409, error));
});