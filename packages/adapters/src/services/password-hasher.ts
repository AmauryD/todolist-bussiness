import { PasswordHashServiceInterface } from "todo-domain";
import { hash } from "bcrypt";

export class PasswordHasherService implements PasswordHashServiceInterface {
	public hash(password: string): string | Promise<string> {
		return hash(password, 10);
	}
}