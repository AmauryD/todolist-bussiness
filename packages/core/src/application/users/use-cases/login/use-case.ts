
import { InvalidCredentialsError } from "../../../../domain/users/errors/invalid-credentials.js";
import { UserDoesNotExistsError } from "../../../../domain/users/errors/does-not-exists.js";
import { UserRepositoryInterface } from "../../repositories/user.js";
import { AuthServiceInterface } from "../../services/auth.service.js";
import { PasswordNotSetError } from "../../../../domain/users/errors/password-not-set.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { LoginUseCaseInput } from "./request.js";
import { UserErrorPresenterInterface } from "../../../index.js";
import { LoggedUserPresenterInterface } from "../../presenters/logged-user.js";
import { AuthRepositoryInterface } from "../../repositories/auth.repository.js";

/**
 * Pas besoin de valider le mot de passe ni l'email
 * Peu importe le format de l'email, ça n'a pas d'importance
 * Pour le mot de passe, seule sa présence importe, et c'est aux couches supérieures de s'assurer de s'en assurer
 */
export class LoginUseCase implements UseCaseInterface {
	public constructor(
		public userRepository : UserRepositoryInterface,
		public authRepository : AuthRepositoryInterface,
		public presenter: LoggedUserPresenterInterface,
		public errorPresenter: UserErrorPresenterInterface,
		public authService: AuthServiceInterface
	) {}

	public async execute(request: LoginUseCaseInput) {
		const user = await this.userRepository.getUserByEmail(request.email);

		if (user.isNothing) {
			return this.errorPresenter.present(new UserDoesNotExistsError());
		}

		if (user.value.password.isNothing) {
			return this.errorPresenter.present(new PasswordNotSetError());
		}

		if (!await this.authService.passwordMatches(request.password, user.value.password.unwrapOr(""))) {
			return this.errorPresenter.present(new InvalidCredentialsError()); 
		}

		const [refreshToken, accessToken] = await Promise.all([
			this.authRepository.generateRefreshTokenForUser(user.value),
			this.authService.generateAccessTokenForUser(user.value.id)
		]);

		return this.presenter.present({
			refreshToken,
			accessToken
		});
	}
}