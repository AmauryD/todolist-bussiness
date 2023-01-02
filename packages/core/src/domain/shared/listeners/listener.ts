import { DomainEventInterface } from "../events/domain-event.js";
import { DomainEvents } from "../events/domain-events.js";
import { Class } from "type-fest";

export abstract class EventListener<E extends DomainEventInterface> {
    protected abstract event: Class<E>;
    
    public setupListener() {
    	DomainEvents.register((e) => this.handle(e as E), this.event.name);
    }

	protected abstract handle(e: E): Promise<void> | void;
}