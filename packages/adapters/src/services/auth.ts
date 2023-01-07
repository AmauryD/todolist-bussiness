
import { compare } from "bcrypt";
import { AuthServiceInterface } from "todo-domain";

export class AuthService implements AuthServiceInterface {
	public passwordMatches(password: string, storedPassword: string): Promise<boolean> {
		return compare(password, storedPassword);
	}
}