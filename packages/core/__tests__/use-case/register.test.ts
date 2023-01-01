import assert from "node:assert";
import { it } from "node:test";
import { Maybe } from "true-myth";
import { just, nothing } from "true-myth/maybe";
import Result, { Err, ok } from "true-myth/result";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";
import { User } from "../../src/domain/users/entities/user.js";
import { UserAlreadyExistsError } from "../../src/domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../src/domain/users/repositories/user.js";
import { RegisterUseCase } from "../../src/use-cases/auth/register.js";
import { FakeIdGenerator } from "../fixtures/id-generator.js";

class FailUserRepository implements UserRepositoryInterface {
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "amaury",
			email: "a",
			password: just(""),
			id: Identifier.create("1")
		}));
	}
}

class SuccessUserRepository extends FailUserRepository {
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		return ok(User.create({
			username: "amaury",
			email: "a",
			password: just(""),
			id: Identifier.create("1")
		}));
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return nothing();
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