import { LoginUseCase, LoginUseCaseRequest, RegisterUseCase, RegisterUseCaseRequest } from "todo-domain/index.js";

export class WebAuthController {
	public constructor(
        public loginUseCase: LoginUseCase,
        public registerUseCase: RegisterUseCase
	) {}

	public async login(loginRequest: LoginUseCaseRequest) {
		return this.loginUseCase.execute(loginRequest);
	}

	public async register(registerRequest: RegisterUseCaseRequest) {
		return this.registerUseCase.execute(registerRequest);
	}
}