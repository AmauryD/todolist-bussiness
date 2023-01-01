import { Maybe } from "true-myth";
import { AggregateRoot } from "../../shared/entities/aggregate-root.js";
import { Identifier } from "../../shared/value-objects/identifier.js";
import { UserCreatedEvent } from "../events/user-created.js";

export interface UserProperties {
    username: string;
	email: string;
    password: Maybe<string>;
    id: Identifier;
}

export type UserSnapshot = UserProperties;

export class User extends AggregateRoot<UserSnapshot> {
	private constructor(
        private props: UserProperties
	) {
		super();
	}
    
	public get id() {
		return this.props.id;
	}

	public get password() {
		return this.props.password;
	}
	
	public get email() {
		return this.props.email;
	}

	public get username() {
		return this.props.username;
	}

	public static create(props: UserProperties) {
		const user = new User(props);

		user.addEvent(new UserCreatedEvent(user.snapshot()));

		return user;
	}

	public snapshot(): UserProperties {
		return {...this.props}; 
	}

}