import { LoginUseCaseOutput } from "todo-domain/application/users/use-cases/login/response.js";
import { LoggedUserPresenterInterface } from "todo-domain/index.js";

export class LoggedUserPresenter implements LoggedUserPresenterInterface {
	public present(data: LoginUseCaseOutput) {
		return {
			accessToken: data.accessToken,
			refreshToken : data.refreshToken
		};
	}
}