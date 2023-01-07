import assert from "node:assert";
import { it } from "node:test";
import { Identifier, User } from "todo-domain";
import { nothing } from "true-myth/maybe";
import { UserPresenter } from "../../../src/presenters/user.js";

it("Present User for the view", () => {
	const userPresenter = new UserPresenter();
	const user = User.create({
		validationToken: nothing(),
		isValidated: false,
		password: nothing(),
		id: Identifier.create("1"),
		username: "amaury",
		email: "amaury@triptyk.eu"
	});

	assert.deepStrictEqual(userPresenter.present(user), {
		user: {
			validationToken: undefined,
			password: undefined,
			id: "1",
			username: "amaury",
			email: "amaury@triptyk.eu"
		}
	});
});