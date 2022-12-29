import { EventArgs, EventSubscriber, Subscriber } from "@mikro-orm/core";
import { DomainEvents } from "todo-domain/index.js";

@Subscriber()
export class AfterCreationSubscriber implements EventSubscriber {
	public async afterCreate(args: EventArgs<{ id: string }> ) {
		DomainEvents.dispatchEventForAggregate(args.entity.id);
	}
}