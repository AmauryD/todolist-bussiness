import { Identifier, User, UserRepositoryInterface } from "todo-domain";
import { Maybe, Result } from "true-myth";
import { just, Nothing, nothing } from "true-myth/maybe";

export class UserRepository implements UserRepositoryInterface {
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
