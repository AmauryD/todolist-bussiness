import { User, UserRepositoryInterface } from "todo-domain";
import { Maybe, Result } from "true-myth";
import { just } from "true-myth/maybe";
import { identifier } from "./identifier.js";

export class UserRepository implements UserRepositoryInterface {
	public async createWithoutPassword(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "amaury",
			email: "a",
			password: just(""),
			id: identifier("1")
		}));
	}
}
