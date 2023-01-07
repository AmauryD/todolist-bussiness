import { User, UserPresenterInterface } from "todo-domain";

export class UserPresenter implements UserPresenterInterface {
	public present(data: User) {
		return {
			user: data.snapshot()
		};
	}
}