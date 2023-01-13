import { RegisterUseCase, RegisterUseCaseRequest } from "todo-domain";
import { UserPresenter, UserErrorPresenter } from "../../index.js";
import { throwIfWebErrorOrReturn } from "../../utils/throw-or-return.js";

type PresentersResult = ReturnType<UserErrorPresenter["present"]> | ReturnType<UserPresenter["present"]>;

export class RegisterWebController {
	public constructor(
        public registerUseCase: RegisterUseCase,
	) {}

	public async register(registerRequest: RegisterUseCaseRequest) {
		const register = await this.registerUseCase.execute(registerRequest) as PresentersResult;
		return throwIfWebErrorOrReturn(register);
	}
}