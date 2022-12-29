import { Maybe } from "true-myth";
import { map } from "true-myth/maybe";
import { DomainEventInterface } from "./domain-event.js";
import { AggregateRoot } from "../entities/aggregate-root.js";

type HandlerFunction = (handler: DomainEventInterface) => void | Promise<void>;

export class DomainEvents {
	private static handlersMap = new Map<string, Set<HandlerFunction>>();
	private static markedAggregates = new Map<string, AggregateRoot<any>>();

	public static markForDispatch(aggregate: AggregateRoot<any>) {
		this.markedAggregates.set(aggregate.id, aggregate);
	}

	public static register(
		callback: HandlerFunction, 
		eventClassName: string
	) {
		const handler = this.getHandler(eventClassName);
		if (handler.isNothing) {
			this.handlersMap.set(eventClassName, new Set());
		}
		this.handlersMap.get(eventClassName)?.add(callback);
	}
    
	public static dispatchEventForAggregate (id: string): void {
		const aggregate = Maybe.of(this.markedAggregates.get(id));
    
		map((aggregate) => {
			this.dispatchAggregateEvents(aggregate);
			aggregate.clearEvents();
			this.removeAggregateFromMarkedDispatchList(aggregate);
		}, aggregate);
	}

	private static getHandler(eventClassName: string) {
		return Maybe.of(this.handlersMap.get(eventClassName));
	}

	private static dispatchAggregateEvents(aggregate :AggregateRoot<any>) {
		for (const event of aggregate.domainEvents) {
			this.dispatch(event);
		}
	}

	private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>) {
		this.markedAggregates.delete(aggregate.id);
	}

	private static dispatch (event: DomainEventInterface): void {
		const eventClassName = event.constructor.name;
		map((handlers) => {
			for (const handler of handlers)
				handler(event);
		}, this.getHandler(eventClassName));
	}
}