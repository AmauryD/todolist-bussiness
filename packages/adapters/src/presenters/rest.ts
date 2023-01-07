import { PresenterInterface } from "todo-domain/src/application/shared/presenters/presenter.js";


export class TodoListsRESTPresenter implements PresenterInterface<unknown> {
	public constructor(
		private entityName: string
	) {}

	public async present(something: unknown) {
		return {
			[this.entityName]: something
		};
	}
}