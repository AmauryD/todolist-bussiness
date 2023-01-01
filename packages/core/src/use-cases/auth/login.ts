
import Result, { err, ok } from "true-myth/result";
import { InvalidCredentialsError } from "../../domain/users/errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../../domain/users/errors/does-not-exists.js";
import { UserRepositoryInterface } from "../../domain/users/repositories/user.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";
import { AuthServiceInterface } from "../../services/auth.service.js";
import { PresenterInterface } from "../../domain/shared/presenters/presenter.js";
import { UserSnapshot } from "../../index.js";
import { PasswordNotSetError } from "../../domain/users/errors/password-not-set.js";

export interface LoginUseCaseRequest {
    email: string,
    password: string
}

export class LoginUseCase implements UseCaseInterface {
	public constructor(
		public userRepository : UserRepositoryInterface,
		public presenter: PresenterInterface<UserSnapshot>,
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

		const presented = await this.presenter.present(user.value.snapshot());

		return ok(presented);
	}
}