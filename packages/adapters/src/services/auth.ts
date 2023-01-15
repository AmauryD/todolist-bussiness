
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthServiceInterface, Identifier } from "todo-domain";

const ONE_HOUR = 60 * 60;

export interface JwtTokenOptions {
	secret: string,
	expirationTimeInHours: number,
	issuer: string
}

export class AuthService implements AuthServiceInterface {
	public constructor(
		private tokenOptions: JwtTokenOptions
	) {}

	public async generateAccessTokenForUser(id: Identifier) {
		return jwt.sign({}, this.tokenOptions.secret, {
			subject: id.value,
			issuer: this.tokenOptions.issuer,
			expiresIn: this.tokenOptions.expirationTimeInHours * ONE_HOUR
		});
	}

	public passwordMatches(password: string, storedPassword: string): Promise<boolean> {
		return compare(password, storedPassword);
	}
}