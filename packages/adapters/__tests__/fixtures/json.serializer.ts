import { PresenterInterface } from "todo-domain/application/shared/interfaces/presenter.js";

export class JsonPresenter implements PresenterInterface<unknown, unknown> {
	public async present(something: unknown) {
		return JSON.stringify(something);
	}
}