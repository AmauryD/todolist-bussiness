import { TodoListAggregateRoot } from "../../../index.js";
import { DomainEventInterface } from "../../shared/events/domain-event.js";

export class TodoListCreatedEvent implements DomainEventInterface {
	public date: Date;
	
	public constructor(
        public entity: Readonly<TodoListAggregateRoot>
	) {
		this.date = new Date();
	}

	public getId(): string {
		return this.entity.id;
	}
}