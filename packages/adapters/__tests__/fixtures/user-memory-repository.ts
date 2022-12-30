import { User, UserRepositoryInterface } from "todo-domain/index.js";
import { Maybe, Result } from "true-myth";

export class UserRepository implements UserRepositoryInterface {
	public async create(): Promise<Result<User, Error>> {
		throw new Error("Method not implemented.");
	}
	public async getUserByEmail(): Promise<Maybe<User>> {
		return Maybe.of(User.create({
			username: "amaury",
			email: "a",
			password: "",
			id: ""
		}));
	}
}
