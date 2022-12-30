import { LoginUseCase, LoginUseCaseRequest, RegisterUseCase } from "todo-domain/index.js";

export class AuthController {
	public constructor(
        public loginUseCase: LoginUseCase,
        public registerUseCase: RegisterUseCase
	) {}

	public async login(loginRequest: LoginUseCaseRequest) {
		const loginUseCase = await this.loginUseCase.execute(loginRequest);

		return loginUseCase;
	}
}