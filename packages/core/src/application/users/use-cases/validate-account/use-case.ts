
import { Just } from "true-myth/maybe";
import { err, ok } from "true-myth/result";
import { Identifier, UserDoesNotExistsError, ValidationToken } from "../../../../domain/index.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { InvalidValidationTokenError } from "../../../../domain/users/errors/invalid-validation-token.js";
import { UserRepositoryInterface } from "../../repositories/user.js";
import { ValidateAccountUseCaseParams } from "./request.js";

export class ValidateAccountUseCase implements UseCaseInterface {
	public constructor(
        private userRepository:  UserRepositoryInterface
	) {
	}

	public async execute(params: ValidateAccountUseCaseParams) {
		const identifier = Identifier.create(params.userId);
		const user = await this.userRepository.getUserById(
			identifier
		);

		if (user.isNothing) {
			return err(new UserDoesNotExistsError());
		}


		const token = ValidationToken.from(params.token); 

		if (!user.value.hasValidationToken) {
			return err(new InvalidValidationTokenError());
		}

		const userToken = user.value.validationToken as Just<ValidationToken>;

		if (token.isErr) {
			return token;
		}

		if (!token.value.equals(userToken.value)) {
			return err(new InvalidValidationTokenError());
		}

		await this.userRepository.validateUserAccount(
			user.value.id
		);

		user.value.validateAccount();
		return ok(user);
	}
}