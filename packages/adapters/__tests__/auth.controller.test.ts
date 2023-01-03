import { it } from "node:test";
import { Identifier, LoginUseCase, RegisterUseCase, UserSnapshot } from "todo-domain";
import { AuthServiceInterface } from "todo-domain";
import { WebAuthController } from "../src/controllers/auth.js";
import { UserRepository } from "./fixtures/user-memory-repository.js";
import assert from "node:assert";
import { Ok } from "true-myth/result";

class AuthService implements AuthServiceInterface {
	public async passwordMatches(): Promise<boolean> {
		return true;
	}
}

function setupLoginUseCase(): LoginUseCase {
	return new LoginUseCase(
		new UserRepository(),
		{
			async present(data) {
				return data.snapshot();
			},
		},
		new AuthService()
	);
}

function setupRegisterUseCase(): RegisterUseCase {
	return new RegisterUseCase(
		new UserRepository(),
		{
			generate() {
				return Identifier.create("1");
			},
		}
	);
}

it("Log user in", async () => {
	const authController = new WebAuthController(
		setupLoginUseCase(),
		setupRegisterUseCase()
	);

	const loginResult = await authController.login({
		email: "a",
		password: "b"
	}) as Ok<UserSnapshot, never>;
	

	assert.strictEqual(loginResult.isOk, true);
	assert.deepEqual(loginResult.value, {
		username: "amaury", 
		email: "a", 
		password: "", 
		id: "1",
		validationToken: undefined
	});
});