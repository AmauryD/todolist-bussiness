import { ValidateAccountUseCase } from "todo-domain";
import { UserErrorPresenter, UserPresenter } from "../../index.js";
import { throwIfWebErrorOrReturn } from "../../utils/throw-or-return.js";

type PresentersResult = ReturnType<UserErrorPresenter["present"]> | ReturnType<UserPresenter["present"]>;

export class ValidateAccountWebController {
	public constructor(
		public validateAccountUseCase: ValidateAccountUseCase
	) {}

	public async validateAccount(userId: string, token: string, password: string) {
		const validated = await this.validateAccountUseCase.execute({
			userId,
			token,
			password
		}) as PresentersResult;
		return throwIfWebErrorOrReturn(validated);
	}
}