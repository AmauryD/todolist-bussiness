
import { Just } from "true-myth/maybe";
import { err, ok } from "true-myth/result";
import { Identifier, UserDoesNotExistsError, ValidationToken } from "../../../index.js";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { InvalidValidationTokenError } from "../errors/invalid-validation-token.js";
import { UserRepositoryInterface } from "../repositories/user.js";

export interface ValidateAccountUseCaseParams {
    token : string;
    userId: string;
}

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

		user.value.validate();
		return ok(user);
	}
}