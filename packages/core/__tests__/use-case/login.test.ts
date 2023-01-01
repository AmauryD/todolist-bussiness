import assert from "node:assert";
import { it } from "node:test";
import { Maybe } from "true-myth";
import { just, nothing } from "true-myth/maybe";
import Result, { Err, Ok } from "true-myth/result";
import { User, UserSnapshot } from "../../src/domain/users/entities/user.js";
import { InvalidCredentialsError } from "../../src/domain/users/errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../../src/domain/users/errors/does-not-exists.js";
import { UserRepositoryInterface } from "../../src/domain/users/repositories/user.js";
import { AuthServiceInterface } from "../../src/services/auth.service.js";
import { LoginUseCase } from "../../src/use-cases/auth/login.js";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";

class InvalidUserRepository implements UserRepositoryInterface {
	public async getUserByEmail(): Promise<Maybe<User>> {
		return nothing();
	}
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
}

class ValidUserRepository implements UserRepositoryInterface {
	public async getUserByEmail(mail: string): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "Amaury",
			id: Identifier.create("123"),
			email: mail,
			password: just("123")
		}));
	}
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
}

class InvalidAuthService implements AuthServiceInterface {
	public async passwordMatches(): Promise<boolean> {
		return false;
	}
}

class ValidAuthService implements AuthServiceInterface {
	public async passwordMatches(): Promise<boolean> {
		return true;
	}
}

async function createAndExecuteUseCase(repository: UserRepositoryInterface, authService: AuthServiceInterface) {
	const useCase = new LoginUseCase(
		repository,
		{
			async present(data) {
				return data;
			},
		},
		authService
	);
	const result = await useCase.execute({
		email: "amaury",
		password: "123"
	});
	return result;
}

it("Returns UserDoesNotExistsError when email does not exists",  async () => {
	const result = (await createAndExecuteUseCase(new InvalidUserRepository(), new ValidAuthService())) as Err<never,UserDoesNotExistsError>;
	assert.strictEqual(result?.isErr, true);
	assert.strictEqual(result.error.constructor, UserDoesNotExistsError);
});

it("Returns InvalidCredentialsError when password does not match",  async () => {
	const result = (await createAndExecuteUseCase(new ValidUserRepository(), new InvalidAuthService())) as Err<never,InvalidCredentialsError>;
	assert.strictEqual(result?.isErr, true);
	assert.strictEqual(result.error.constructor, InvalidCredentialsError);
});

it("Returns User snapshot when email is found and password matches",  async () => {
	const result = (await createAndExecuteUseCase(new ValidUserRepository(), new ValidAuthService())) as Ok<UserSnapshot,never>;
	assert.strictEqual(result?.isOk, true);
	assert.deepEqual(result.value, {
		email: "amaury",
		id: Identifier.create("123"),
		password: just("123"),
		username: "Amaury"
	});
});
