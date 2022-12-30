import Result, { err, map } from "true-myth/result";
import { UserSnapshot } from "../../domain/users/entities/user.js";
import { UserAlreadyExistsError } from "../../domain/users/errors/already-exists.js";
import { UserRepositoryInterface } from "../../domain/users/repositories/user.js";
import { IdGeneratorInterface } from "../../index.js";
import { HashServiceInterface } from "../../interfaces/hasher.js";
import { UseCaseInterface } from "../../interfaces/use-case.js";

export interface RegisterUseCaseParams {
    username: string;
    email: string;
    password: string;
	saltKey: string
}

export class RegisterUseCase implements UseCaseInterface {
	public constructor(
        public userRepository: UserRepositoryInterface,
		public hashService: HashServiceInterface,
		public idGenerator: IdGeneratorInterface
	) {}

	public async execute(params: RegisterUseCaseParams): Promise<Result<UserSnapshot, UserAlreadyExistsError>> {
		const existingEmailUser = await this.userRepository.getUserByEmail(params.email);

		if (existingEmailUser.isJust) {
			return err(new UserAlreadyExistsError());
		}

		const hashedPassword = await this.hashService.hash(params.password, params.saltKey);

		const newUser = await this.userRepository.create({
			id: this.idGenerator.generate(),
			username: params.username,
			email: params.password,
			password: hashedPassword
		});

		return map((m) => m.snapshot(), newUser);
	}
}