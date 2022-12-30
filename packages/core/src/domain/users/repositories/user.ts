import { Maybe, Result } from "true-myth";
import { User, UserProperties } from "../entities/user.js";

export interface UserRepositoryInterface {
	getUserByEmail(mail: string) : Promise<Maybe<User>>;
	create(params: UserProperties): Promise<Result<User, Error>>;
}