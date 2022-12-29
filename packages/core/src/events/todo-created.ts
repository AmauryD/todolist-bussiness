import { TodoListAggregateRoot } from "../index.js";
import { DomainEventInterface } from "../interfaces/domain-event.js";

export class TodoListCreatedEvent implements DomainEventInterface<TodoListAggregateRoot> {
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