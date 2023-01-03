import { LoginUseCase, LoginUseCaseRequest, RegisterUseCase, RegisterUseCaseRequest, ValidateAccountUseCase } from "todo-domain/index.js";

export class WebAuthController {
	public constructor(
        public loginUseCase: LoginUseCase,
        public registerUseCase: RegisterUseCase,
		public validateAccountUseCase: ValidateAccountUseCase
	) {}

	public async login(loginRequest: LoginUseCaseRequest) {
		return this.loginUseCase.execute(loginRequest);
	}

	public async register(registerRequest: RegisterUseCaseRequest) {
		return this.registerUseCase.execute(registerRequest);
	}

	public async validateAccount(userId: string, token: string) {
		const validated = await this.validateAccountUseCase.execute({
			userId,
			token
		});
		if (validated?.isErr) {
			throw validated;
		}
		return validated?.value;
	}
}