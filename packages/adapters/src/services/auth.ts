
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthServiceInterface, Identifier } from "todo-domain";

const ONE_MINUTE = 60;

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
		return jwt.sign({
			data: id.value
		}, this.tokenOptions.secret, {
			issuer: this.tokenOptions.issuer,
			expiresIn: this.tokenOptions.expirationTimeInHours * ONE_MINUTE
		});
	}

	public passwordMatches(password: string, storedPassword: string): Promise<boolean> {
		return compare(password, storedPassword);
	}
}