import assert from "node:assert";
import { it } from "node:test";
import { Maybe } from "true-myth";
import { nothing } from "true-myth/maybe";
import Result, { Err, ok } from "true-myth/result";
import { User } from "../../src/domain/users/entities/user.js";
import { UserAlreadyExistsError } from "../../src/domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../src/domain/users/repositories/user.js";
import { HashServiceInterface } from "../../src/interfaces/hasher.js";
import { RegisterUseCase } from "../../src/use-cases/auth/register.js";
import { FakeIdGenerator } from "../fixtures/id-generator.js";
import { identifier } from "../fixtures/identifier.js";

class FailUserRepository implements UserRepositoryInterface {
	public async create(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "amaury",
			email: "a",
			password: "",
			id: identifier("1")
		}));
	}
}

class SuccessUserRepository extends FailUserRepository {
	public async create(): Promise<Result<User, Error>> {
		return ok(User.create({
			username: "amaury",
			email: "a",
			password: "",
			id: identifier("1")
		}));
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return nothing();
	}
}

/**
 * Mocking is not very documented and not typed. We are doing it the old way
 */
class PasswordHasherService implements HashServiceInterface {
	public called =false;

	public async hash(password: string) {
		this.called = true;
		return password.toUpperCase();
	}
}

it("Registers a new User returns UserAlreadyExists error when email is already taken", async () => {
	const useCase = new RegisterUseCase(
		new FailUserRepository(),
		new PasswordHasherService(),
		new FakeIdGenerator()
	);
    
	const newUser = await useCase.execute({
		username: "amaury",
		password: "123",
		email: "amaury@tripttyk.eu",
		saltKey: "123"
	});

	assert.strictEqual(newUser?.isErr, true);
	assert.strictEqual((newUser as Err<never,UserAlreadyExistsError>).error.constructor, UserAlreadyExistsError);
});

it("Hashes user password using the hash service", async () => {
	const hasher = new PasswordHasherService();

	const useCase = new RegisterUseCase(
		new SuccessUserRepository(),
		hasher,
		new FakeIdGenerator()
	);
    
	const newUser = await useCase.execute({
		username: "amaury",
		password: "123",
		email: "amaury@tripttyk.eu",
		saltKey: "123"
	});

	assert.strictEqual(newUser.isOk, true);
	assert.strictEqual(hasher.called, true);
});