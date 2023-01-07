import { just } from "true-myth/maybe";
import { IdGeneratorInterface } from "../../shared/interfaces/id-generator.js";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { UserAlreadyExistsError } from "../../../domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../repositories/user.js";
import { ValidationToken } from "../../../domain/users/value-objects/validation-token.js";
import { UserPresenterInterface } from "../presenters/user.js";
import { UserErrorPresenterInterface } from "../presenters/error/user.js";


export interface RegisterUseCaseRequest {
    username: string;
    email: string;
}

export class RegisterUseCase<
	O extends UserPresenterInterface,
	OE extends UserErrorPresenterInterface,
	RT = ReturnType<O["present"]> | ReturnType<OE["present"]>
> implements UseCaseInterface {
	public constructor(
        public userRepository: UserRepositoryInterface,
		public userPresenter: O,
		public userErrorPresenter: OE,
		public idGenerator: IdGeneratorInterface
	) {}

	public async execute(params: RegisterUseCaseRequest): Promise<RT> {
		const existingEmailUser = await this.userRepository.getUserByEmail(params.email);

		if (existingEmailUser.isJust) {
			return this.userErrorPresenter.present(new UserAlreadyExistsError()) as RT;
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
		}) as RT;
	}
}