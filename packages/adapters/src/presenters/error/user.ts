import { UserAlreadyExistsError, UserErrorPresenterInterface } from "todo-domain";
import { WebError } from "../../interfaces/web-error.js";

export class UserErrorPresenter implements UserErrorPresenterInterface {
	public present(error: Error): WebError {
		if (error instanceof UserAlreadyExistsError) {
			return {
				code: 409,
				original: error
			};
		}
		return {
			code: 500,
			original: error
		};
	}
}