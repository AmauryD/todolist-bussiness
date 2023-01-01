import { AggregateRoot } from "../../shared/entities/aggregate-root.js";
import { Identifier } from "../../shared/value-objects/identifier.js";

export interface UserProperties {
    username: string;
	email: string;
    password: string;
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

	public static create(props: UserProperties) {
		const user = new User(props);
		return user;
	}

	public snapshot(): UserProperties {
		return {...this.props}; 
	}

}