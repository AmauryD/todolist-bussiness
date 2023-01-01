import { Maybe, Result } from "true-myth";
import { User, UserProperties } from "../entities/user.js";

type UserPropertiesWithoutPassword = Omit<UserProperties, "password">;
 
export interface UserRepositoryInterface {
	getUserByEmail(mail: string) : Promise<Maybe<User>>;
	createWithoutPassword(params: UserPropertiesWithoutPassword): Promise<Result<User, Error>>;
}