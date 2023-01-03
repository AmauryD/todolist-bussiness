import { AuthServiceInterface } from "todo-domain/index.js";
import { compare } from "bcrypt";

export class AuthService implements AuthServiceInterface {
	public passwordMatches(password: string, storedPassword: string): Promise<boolean> {
		return compare(password, storedPassword);
	}
}