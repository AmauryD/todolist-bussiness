
import Result, { err, ok } from "true-myth/result";
import { InvalidCredentialsError } from "../../../../domain/users/errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../../../../domain/users/errors/does-not-exists.js";
import { UserRepositoryInterface } from "../../repositories/user.js";
import { AuthServiceInterface } from "../../services/auth.service.js";
import { PasswordNotSetError } from "../../../../domain/users/errors/password-not-set.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { UserPresenterInterface } from "../../presenters/user.js";
import { LoginUseCaseRequest } from "./request.js";

/**
 * Pas besoin de valider le mot de passe ni l'email
 * Peu importe le format de l'email, ça n'a pas d'importance
 * Pour le mot de passe, seule sa présence importe, et c'est aux couches supérieures de s'assurer de s'en assurer
 */
export class LoginUseCase implements UseCaseInterface {
	public constructor(
		public userRepository : UserRepositoryInterface,
		public presenter: UserPresenterInterface,
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