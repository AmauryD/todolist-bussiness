import { it } from "node:test";
import { LoginUseCase, RegisterUseCase, UserSnapshot } from "todo-domain/index.js";
import { AuthServiceInterface } from "todo-domain";
import { AuthController } from "../src/controllers/auth.js";
import { UserRepository } from "./fixtures/user-memory-repository.js";
import assert from "node:assert";
import { Ok } from "true-myth/result";

class AuthService implements AuthServiceInterface {
	public async passwordMatches(): Promise<boolean> {
		return true;
	}
}

it("Log user in", async () => {
	const authController = new AuthController(
		new LoginUseCase(
			new UserRepository(),
			{
				async present(data) {
					return data;
				},
			},
			new AuthService(),
		),
		new RegisterUseCase(
			new UserRepository(),
			{
				async hash(password) {
					return password.toUpperCase();
				},
			},
			{
				generate() {
					return "1";
				},
			}
		)
	);

	const loginResult = await authController.login({
		email: "a",
		password: "b"
	});
	

	assert.strictEqual(loginResult.isOk, true);
	assert.deepEqual((loginResult as Ok<UserSnapshot, never>).value, {
		username: "amaury", 
		email: "a", 
		password: "", 
		id: ""
	});
});