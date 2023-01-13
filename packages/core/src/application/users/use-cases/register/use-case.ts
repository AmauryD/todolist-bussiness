import { just } from "true-myth/maybe";
import { IdGeneratorInterface } from "../../../shared/interfaces/id-generator.js";
import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { UserAlreadyExistsError } from "../../../../domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../repositories/user.js";
import { ValidationToken } from "../../../../domain/users/value-objects/validation-token.js";
import { RegisterUseCaseRequest } from "./request.js";
import { UserPresenterInterface } from "../../presenters/user.js";
import { UserErrorPresenterInterface } from "../../../index.js";

export class RegisterUseCase implements UseCaseInterface {
	public constructor(
        public userRepository: UserRepositoryInterface,
		public userPresenter: UserPresenterInterface,
		public userErrorPresenter: UserErrorPresenterInterface,
		public idGenerator: IdGeneratorInterface
	) {}

	public async execute(params: RegisterUseCaseRequest) {
		const existingEmailUser = await this.userRepository.getUserByEmail(params.email);

		if (existingEmailUser.isJust) {
			return this.userErrorPresenter.present(new UserAlreadyExistsError());
		}

		const generatedId = this.idGenerator.generate();

		const newUser = await this.userRepository.createWithoutPassword({
			id: generatedId,
			username: params.username,
			validationToken: just(ValidationToken.generate()),
			isValidated: false,
			email: params.email
		});

		return newUser.match({
			Ok : (value) => this.userPresenter.present(value),
			Err: (error) => this.userErrorPresenter.present(error),
		});
	}
}