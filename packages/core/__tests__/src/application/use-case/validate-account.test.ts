
import assert from "node:assert";
import { it } from "node:test";
import { Maybe, Result } from "true-myth";
import { just, nothing, Nothing } from "true-myth/maybe";
import { ok } from "true-myth/result";
import { InvalidValidationTokenError } from "../../../../src/domain/users/errors/invalid-validation-token.js";
import { UserRepositoryInterface, User, Identifier, ValidateAccountUseCase, UserDoesNotExistsError } from "../../../../src/index.js";

class FakeUserRepository implements UserRepositoryInterface {
	public async getUserByEmail(): Promise<Maybe<User>> {
		return nothing();
	}
	public async getUserById(userId: Identifier): Promise<Maybe<User>> {
		if (userId.value === "exists") {
			return just(User.create({
				username: "Amaury",
				validationToken: nothing(),
				id: Identifier.create("123"),
				isValidated: false,
				email: "mail",
				password: just("123")
			}));
		}
		return nothing();
	}
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
	public async validateUserAccount(): Promise<Result<Nothing<unknown>, Error>> {
		return ok(nothing());
	}
}

const mirrorPresenter =  {
	present(error: unknown) {
		return error;	
	},
};

it("Returns error when userId does not exists", async () => {
	const useCase = new ValidateAccountUseCase(
		new FakeUserRepository(),
		mirrorPresenter,
		mirrorPresenter
	);
	const result = await useCase.execute({
		userId: "",
		token: ""
	});
	assert(result instanceof UserDoesNotExistsError);
});

it("Returns error when token is invalid", async () => {
	const useCase = new ValidateAccountUseCase(
		new FakeUserRepository(),
		mirrorPresenter,
		mirrorPresenter
	);

	const result = await useCase.execute({
		userId: "exists",
		token: ""
	});
	
	assert(result instanceof InvalidValidationTokenError);
});