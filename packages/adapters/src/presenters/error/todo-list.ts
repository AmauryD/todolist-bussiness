import { TodoListNameRequiredError, UserErrorPresenterInterface, UserRequiredError } from "todo-domain";
import { WebError } from "../../errors/web-error.js";
import { Class } from "type-fest"; 

const errorToErrorCodeMap = new Map<Class<Error>, number>([
	[TodoListNameRequiredError, 400],
	[UserRequiredError, 401]
]);

export class TodoListErrorPresenter implements UserErrorPresenterInterface {
	public present(error: Error): WebError {
		const knownErrorCode = errorToErrorCodeMap.get(error.constructor as Class<Error>);
		if (knownErrorCode) {
			return new WebError(knownErrorCode, error);
		}
		return new WebError(500, error);
	}
}