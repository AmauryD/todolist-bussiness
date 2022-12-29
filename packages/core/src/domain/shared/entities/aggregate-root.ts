import { EntityInterface } from "../../../index.js";
import { DomainEventInterface } from "../events/domain-event.js";

export abstract class AggregateRoot<T extends object>  implements EntityInterface<T> {
	private readonly _events: DomainEventInterface[] = [];
    
	public get domainEvents(): ReadonlyArray<DomainEventInterface> {
		return this._events;    
	}
    
    public abstract get id(): string;
	
    public addEvent(event: DomainEventInterface) {
    	this._events.push(event);
    }
    public clearEvents (): void {
    	this._events.splice(0, this._events.length);
    }
	
	public abstract snapshot(): T;
}