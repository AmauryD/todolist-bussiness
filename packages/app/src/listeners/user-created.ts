import { DomainEvents } from "todo-domain";

export class UserCreatedListener {
	public setupListener() {
		DomainEvents.register(() => {
			console.log("user created");
		}, "UserCreatedEvent");
	}
}