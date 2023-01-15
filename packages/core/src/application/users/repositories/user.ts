import { Maybe, Result } from "true-myth";
import { Nothing } from "true-myth/maybe";
import { Identifier } from "../../../domain/index.js";
import { User, UserProperties } from "../../../domain/users/entities/user.js";

export type UserPropertiesWithoutPassword = Omit<UserProperties, "password">;
 
export interface UserRepositoryInterface {
	getUserByEmail(mail: string) : Promise<Maybe<User>>;
	getUserById(userId: Identifier) : Promise<Maybe<User>>;
	createWithoutPassword(params: UserPropertiesWithoutPassword): Promise<Result<User, Error>>;
	validateUserAccount(userId: Identifier, password: string): Promise<Result<Nothing<unknown>, Error>>;
}