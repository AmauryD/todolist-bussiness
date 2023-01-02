import Result, { err, map } from "true-myth/result";
import { IdGeneratorInterface } from "../../shared/interfaces/id-generator.js";
import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { UserSnapshot } from "../entities/user.js";
import { UserAlreadyExistsError } from "../errors/already-exists.js";
import { UserRepositoryInterface } from "../repositories/user.js";


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

		const newUser = await this.userRepository.createWithoutPassword({
			id: generatedId,
			username: params.username,
			email: params.email
		});

		return map((m) => m.snapshot(), newUser);
	}
}