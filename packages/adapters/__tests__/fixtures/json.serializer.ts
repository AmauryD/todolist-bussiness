import { PresenterInterface } from "todo-domain/domain/shared/presenters/presenter.js";

export class JsonSerializer implements PresenterInterface<unknown> {
	public async present(something: unknown) {
		return JSON.stringify(something);
	}
}