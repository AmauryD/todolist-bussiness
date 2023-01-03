import { Maybe } from "true-myth";
import { DomainEventInterface } from "./domain-event.js";
import { AggregateRoot } from "../entities/aggregate-root.js";

export type HandlerFunction = (handler: DomainEventInterface) => void | Promise<void>;

export class DomainEvents {
	private static handlersMap = new Map<string, Set<HandlerFunction>>();
	private static markedAggregates = new Map<string, AggregateRoot<any>>();

	public static markForDispatch(aggregate: AggregateRoot<any>) {
		this.markedAggregates.set(aggregate.id.value, aggregate);
	}

	public static register(
		callback: HandlerFunction, 
		eventClassName: string
	) {
		const handler = this.getHandlers(eventClassName);
		if (handler.isNothing) {
			this.handlersMap.set(eventClassName, new Set());
		}
		this.handlersMap.get(eventClassName)?.add(callback);
	}
    
	public static dispatchEventForAggregate (id: string): void {
		const aggregate = Maybe.of(this.markedAggregates.get(id));
    
		aggregate.match({
			Just : (aggregate) => {
				this.dispatchAggregateEvents(aggregate);
				aggregate.clearEvents();
				this.removeAggregateFromMarkedDispatchList(aggregate);
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			Nothing() {},
		});
	}

	private static getHandlers(eventClassName: string) {
		return Maybe.of(this.handlersMap.get(eventClassName));
	}

	private static dispatchAggregateEvents(aggregate :AggregateRoot<any>) {
		for (const event of aggregate.domainEvents) {
			this.dispatch(event);
		}
	}

	private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>) {
		this.markedAggregates.delete(aggregate.id.value);
	}

	private static dispatch (event: DomainEventInterface): void {
		const eventClassName = event.constructor.name;
		const handlers = this.getHandlers(eventClassName);
		
		handlers.match({
			Just(handlers) {
				for (const handler of handlers) {
					handler(event);
				}
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			Nothing() {},
		});
	}
}