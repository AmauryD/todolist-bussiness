import assert from "node:assert";
import { it } from "node:test";
import { Maybe } from "true-myth";
import { just, Nothing, nothing } from "true-myth/maybe";
import Result, { Err } from "true-myth/result";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";
import { User } from "../../src/domain/users/entities/user.js";
import { UserAlreadyExistsError } from "../../src/domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../src/domain/users/repositories/user.js";
import { RegisterUseCase } from "../../src/domain/users/use-cases/register.js";
import { FakeIdGenerator } from "../fixtures/id-generator.js";

class FailUserRepository implements UserRepositoryInterface {
	public validateUserAccount(): Promise<Result<Nothing<unknown>, Error>> {
		throw new Error("Method not implemented.");
	}
	public getUserById(): Promise<Maybe<User>> {
		throw new Error("Method not implemented.");
	}
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "amaury",
			email: "a",
			isValidated: false,
			validationToken: nothing(),
			password: just(""),
			id: Identifier.create("1")
		}));
	}
}

it("Registers a new User returns UserAlreadyExists error when email is already taken", async () => {
	const useCase = new RegisterUseCase(
		new FailUserRepository(),
		new FakeIdGenerator()
	);
    
	const newUser = await useCase.execute({
		username: "amaury",
		email: "amaury@tripttyk.eu"
	});

	assert.strictEqual(newUser?.isErr, true);
	assert.strictEqual((newUser as Err<never,UserAlreadyExistsError>).error.constructor, UserAlreadyExistsError);
});