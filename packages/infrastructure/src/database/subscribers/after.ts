import { EventArgs, EventSubscriber, Subscriber } from "@mikro-orm/core";
import { DomainEvents } from "todo-domain";

@Subscriber()
export class AfterCreationSubscriber implements EventSubscriber {
	public async afterCreate(args: EventArgs<{ id: string }> ) {
		if (args.changeSet?.persisted) {
			DomainEvents.dispatchEventForAggregate(args.entity.id);
		}
	}
}