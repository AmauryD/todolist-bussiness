
import Result, { err, ok } from "true-myth/result";
import { InvalidCredentialsError } from "../errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../errors/does-not-exists.js";
import { UserRepositoryInterface } from "../repositories/user.js";
import { AuthServiceInterface } from "../services/auth.service.js";
import { PresenterInterface } from "../../shared/presenters/presenter.js";
import { PasswordNotSetError } from "../errors/password-not-set.js";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { User } from "../entities/user.js";

export interface LoginUseCaseRequest {
    email: string,
    password: string
}

export class LoginUseCase implements UseCaseInterface {
	public constructor(
		public userRepository : UserRepositoryInterface,
		public presenter: PresenterInterface<User>,
		public authService: AuthServiceInterface
	) {}

	public async execute(request: LoginUseCaseRequest): Promise<Result<unknown,UserDoesNotExistsError | InvalidCredentialsError>> {
		const user = await this.userRepository.getUserByEmail(request.email);

		if (user.isNothing) {
			return err(new UserDoesNotExistsError());
		}

		if (user.value.password.isNothing) {
			return err(new PasswordNotSetError());
		}

		if (!await this.authService.passwordMatches(request.password, user.value.password.unwrapOr(""))) {
			return err(new InvalidCredentialsError()); 
		}

		const presented = await this.presenter.present(user.value);

		return ok(presented);
	}
}