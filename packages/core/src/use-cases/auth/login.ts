
import Result, { err, ok } from "true-myth/result";
import { UserSnapshot } from "../../domain/users/entities/user.js";
import { InvalidCredentialsError } from "../../domain/users/errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../../domain/users/errors/does-not-exists.js";
import { UserRepositoryInterface } from "../../domain/users/repositories/user.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";
import { AuthServiceInterface } from "../../services/auth.service.js";

interface LoginUseCaseRequest {
    email: string,
    password: string
}

export class LoginUseCase implements UseCaseInterface {
	public constructor(
		public userRepository : UserRepositoryInterface,
		public authService: AuthServiceInterface
	) {}

	public async execute(request: LoginUseCaseRequest): Promise<Result<UserSnapshot,UserDoesNotExistsError | InvalidCredentialsError>> {
		const user = await this.userRepository.getUserByEmail(request.email);

		if (user.isNothing) {
			return err(new UserDoesNotExistsError());
		}

		if (!await this.authService.passwordMatches(request.password, user.value.password)) {
			return err(new InvalidCredentialsError()); 
		}

		return ok(user.value.snapshot());
	}
}