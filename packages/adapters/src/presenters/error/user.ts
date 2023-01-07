import { UserAlreadyExistsError, UserDoesNotExistsError, UserErrorPresenterInterface } from "todo-domain";
import { WebError } from "../../errors/web-error.js";
import { Class } from "type-fest"; 

export const errorToErrorCodeMap = new Map<Class<Error>, number>([
	[UserAlreadyExistsError, 409],
	[UserDoesNotExistsError, 404]
]);

export class UserErrorPresenter implements UserErrorPresenterInterface {
	public present(error: Error): WebError {
		const knownErrorCode = errorToErrorCodeMap.get(error.constructor as Class<Error>);
		if (knownErrorCode) {
			return new WebError(knownErrorCode, error);
		}
		return new WebError(500, error);
	}
}