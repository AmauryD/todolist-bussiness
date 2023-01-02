
import { EventListener } from "../../shared/listeners/listener.js";
import { UserCreatedEvent } from "../../users/events/user-created.js";

export abstract class AbstractSendConfirmationMailListener extends EventListener<UserCreatedEvent> {
	protected event = UserCreatedEvent;	
}