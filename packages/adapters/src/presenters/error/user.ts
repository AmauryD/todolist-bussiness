import { UserAlreadyExistsError, UserDoesNotExistsError, UserErrorPresenterInterface } from "todo-domain";
import { WebError } from "../../interfaces/web-error.js";
import { Class } from "type-fest"; 

export const errorsMap = new Map<Class<Error>, number>([
	[UserAlreadyExistsError, 409],
	[UserDoesNotExistsError, 404]
]);

export class UserErrorPresenter implements UserErrorPresenterInterface {
	public present(error: Error): WebError {
		const knownError = errorsMap.get(error.constructor as Class<Error>);
		if (knownError) {
			return {
				code: knownError,
				original: error
			};
		}
		return {
			code: 500,
			original: error
		};
	}
}