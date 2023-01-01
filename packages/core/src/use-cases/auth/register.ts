import Result, { err, map } from "true-myth/result";
import { UserSnapshot } from "../../domain/users/entities/user.js";
import { UserAlreadyExistsError } from "../../domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../domain/users/repositories/user.js";
import { IdGeneratorInterface } from "../../index.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";

export interface RegisterUseCaseRequest {
    username: string;
    email: string;
}

export class RegisterUseCase implements UseCaseInterface {
	public constructor(
        public userRepository: UserRepositoryInterface,
		public idGenerator: IdGeneratorInterface
	) {}

	public async execute(params: RegisterUseCaseRequest): Promise<Result<UserSnapshot, UserAlreadyExistsError | Error>> {
		const existingEmailUser = await this.userRepository.getUserByEmail(params.email);

		if (existingEmailUser.isJust) {
			return err(new UserAlreadyExistsError());
		}

		const generatedId = this.idGenerator.generate();

		if (generatedId.isErr) {
			return err(generatedId.error);
		}

		const newUser = await this.userRepository.createWithoutPassword({
			id: generatedId.value,
			username: params.username,
			email: params.email
		});

		return map((m) => m.snapshot(), newUser);
	}
}