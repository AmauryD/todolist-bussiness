import { LoginUseCase, LoginUseCaseInput } from "todo-domain";
import { UserErrorPresenter, UserPresenter } from "../../index.js";
import { throwIfWebErrorOrReturn } from "../../utils/throw-or-return.js";

type PresentersResult = ReturnType<UserErrorPresenter["present"]> | ReturnType<UserPresenter["present"]>;

export class LoginWebController {
	public constructor(
        public loginUseCase: LoginUseCase,
	) {}

	public async login(loginRequest: LoginUseCaseInput) {
		const logged = await this.loginUseCase.execute(loginRequest) as PresentersResult;
		return throwIfWebErrorOrReturn(logged);
	}
}