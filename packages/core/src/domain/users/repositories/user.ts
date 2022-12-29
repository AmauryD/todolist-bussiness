import { Maybe } from "true-myth";
import { User } from "../entities/user.js";

export interface UserRepositoryInterface {
	getUserByEmail(mail: string) : Promise<Maybe<User>>;
}