import { err } from "true-myth/result";
import { UserAlreadyExistsError } from "../../domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../domain/users/repositories/user.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";

export interface RegisterUseCaseParams {
    username: string;
    email: string;
    password: string;
}

export class RegisterUseCase implements UseCaseInterface {
	public constructor(
        public userRepository: UserRepositoryInterface
	) {}

	public async execute(params: RegisterUseCaseParams) {
		const existingEmailUser = await this.userRepository.getUserByEmail(params.email);
		if (existingEmailUser.isJust) {
			return err(new UserAlreadyExistsError());
		}
	}
}