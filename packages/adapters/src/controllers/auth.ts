import { LoginUseCase, RegisterUseCase, ValidateAccountUseCase, RegisterUseCaseRequest } from "todo-domain";
import { LoginUseCaseRequest } from "todo-domain";
import { WebError } from "../index.js";
import { UserErrorPresenter } from "../presenters/error/user.js";
import { UserPresenter } from "../presenters/user.js";

export class WebAuthController {
	public constructor(
        public loginUseCase: LoginUseCase,
        public registerUseCase: RegisterUseCase<UserPresenter,UserErrorPresenter>,
		public validateAccountUseCase: ValidateAccountUseCase
	) {}

	public async login(loginRequest: LoginUseCaseRequest) {
		return this.loginUseCase.execute(loginRequest);
	}

	public async register(registerRequest: RegisterUseCaseRequest) {
		const register = await this.registerUseCase.execute(registerRequest);
		if (register instanceof WebError) {
			throw register;
		}
		return register;
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