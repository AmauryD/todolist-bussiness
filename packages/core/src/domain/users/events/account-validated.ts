
import { DomainEventInterface } from "../../shared/events/domain-event.js";
import { UserSnapshot } from "../entities/user.js";

export class UserAccountValidatedEvent implements DomainEventInterface {
	public date: Date;
	
	public constructor(
        public entity: Readonly<UserSnapshot>
	) {
		this.date = new Date();
	}

	public getId(): string {
		return this.entity.id;
	}
}