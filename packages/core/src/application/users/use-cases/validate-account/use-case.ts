
import { Just } from "true-myth/maybe";
import { Identifier, UserDoesNotExistsError, ValidationToken } from "../../../../domain/index.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { InvalidValidationTokenError } from "../../../../domain/users/errors/invalid-validation-token.js";
import { UserRepositoryInterface } from "../../repositories/user.js";
import { ValidateAccountUseCaseParams } from "./request.js";
import { UserErrorPresenterInterface, UserPresenterInterface } from "../../../index.js";

export class ValidateAccountUseCase implements UseCaseInterface {
	public constructor(
        private userRepository:  UserRepositoryInterface,
		private errorPresenter: UserErrorPresenterInterface,
		private presenter: UserPresenterInterface
	) {}

	public async execute(params: ValidateAccountUseCaseParams) {
		const identifier = Identifier.create(params.userId);
		const user = await this.userRepository.getUserById(
			identifier
		);

		if (user.isNothing) {
			return this.errorPresenter.present(new UserDoesNotExistsError());
		}

		const token = ValidationToken.from(params.token); 

		if (!user.value.hasValidationToken) {
			return this.errorPresenter.present(new InvalidValidationTokenError());
		}

		const userToken = user.value.validationToken as Just<ValidationToken>;

		if (token.isErr) {
			return this.errorPresenter.present(token.error);
		}

		if (!token.value.equals(userToken.value)) {
			return this.errorPresenter.present(new InvalidValidationTokenError());
		}

		await this.userRepository.validateUserAccount(
			user.value.id
		);

		user.value.validateAccount();

		return this.presenter.present(user.value);
	}
}