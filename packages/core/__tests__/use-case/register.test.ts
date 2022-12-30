import assert from "node:assert";
import { it } from "node:test";
import { Maybe } from "true-myth";
import { Err } from "true-myth/result";
import { User } from "../../src/domain/users/entities/user.js";
import { UserAlreadyExistsError } from "../../src/domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../src/domain/users/repositories/user.js";
import { RegisterUseCase } from "../../src/use-cases/auth/register.js";

class FailUserRepository implements UserRepositoryInterface {
	public async getUserByEmail(): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "amaury",
			email: "a",
			password: "",
			id: ""
		}));
	}
}

it("Registers a new User returns UserAlreadyExists error when email is already taken", async () => {
	const useCase = new RegisterUseCase(
		new FailUserRepository()
	);
    
	const newUser = await useCase.execute({
		username: "amaury",
		password: "123",
		email: "amaury@tripttyk.eu"
	});

	assert.strictEqual(newUser?.isErr, true);
	assert.strictEqual((newUser as Err<never,UserAlreadyExistsError>).error.constructor, UserAlreadyExistsError);
});