import { Todo } from "../../index.js";
import { DomainEventInterface } from "../../shared/events/domain-event.js";

export class TodoCreatedEvent implements DomainEventInterface {
	public date: Date;
	
	public constructor(
        public entity: Readonly<Todo>
	) {
		this.date = new Date();
	}

	public getId(): string {
		return this.entity.id.value;
	}
}