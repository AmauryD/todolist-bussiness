import assert from "node:assert";
import { it } from "node:test";
import { Maybe } from "true-myth";
import { nothing } from "true-myth/maybe";
import { Err, Ok } from "true-myth/result";
import { User, UserSnapshot } from "../../src/domain/users/entities/user.js";
import { InvalidCredentialsError } from "../../src/domain/users/errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../../src/domain/users/errors/does-not-exists.js";
import { UserRepositoryInterface } from "../../src/domain/users/repositories/user.js";
import { AuthServiceInterface } from "../../src/services/auth.service.js";
import { LoginUseCase } from "../../src/use-cases/auth/login.js";

class InvalidUserRepository implements UserRepositoryInterface {
	public async getUserByEmail(): Promise<Maybe<User>> {
		return nothing();
	}
}

class ValidUserRepository implements UserRepositoryInterface {
	public async getUserByEmail(mail: string): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "Amaury",
			id: "123",
			email: mail,
			password: "aaaaa"
		}));
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
		authService
	);
	const result = await useCase.execute({
		email: "amaury",
		password: "123"
	});
	return result;
}

it("Returns UserDoesNotExistsError when email does not exists",  async () => {
	const result = await createAndExecuteUseCase(new InvalidUserRepository(), new ValidAuthService());
	assert.strictEqual(result?.isErr, true);
	assert.strictEqual((result as Err<never,UserDoesNotExistsError>).error.constructor, UserDoesNotExistsError);
});

it("Returns InvalidCredentialsError when password does not match",  async () => {
	const result = await createAndExecuteUseCase(new ValidUserRepository(), new InvalidAuthService());
	assert.strictEqual(result?.isErr, true);
	assert.strictEqual((result as Err<never,InvalidCredentialsError>).error.constructor, InvalidCredentialsError);
});

it("Returns User snapshot when email is found and password matches",  async () => {
	const result = await createAndExecuteUseCase(new ValidUserRepository(), new ValidAuthService());
	assert.strictEqual(result?.isOk, true);
	assert.deepEqual((result as Ok<UserSnapshot,never>).value, {
		email: "amaury",
		id: "123",
		password: "aaaaa",
		username: "Amaury"
	});
});
