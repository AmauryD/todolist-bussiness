import { Maybe } from "true-myth";
import { AggregateRoot } from "../../shared/entities/aggregate-root.js";
import { Identifier } from "../../shared/value-objects/identifier.js";
import { UserAccountValidatedEvent } from "../events/account-validated.js";
import { UserCreatedEvent } from "../events/user-created.js";
import { ValidationToken } from "../value-objects/validation-token.js";

export interface UserProperties {
    username: string;
	email: string;
	isValidated: boolean;
    password: Maybe<string>;
	validationToken: Maybe<ValidationToken>;
    id: Identifier;
}

export interface UserSnapshot {
	username: string;
	email: string;
	validationToken?: string;
    password?: string;
    id: string;
}

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

	public get validationToken() {
		return this.props.validationToken;
	}

	public get isValidated() {
		return this.props.isValidated;
	}

	public get hasValidationToken() {
		return this.validationToken.isJust;
	}

	public get username() {
		return this.props.username;
	}

	public static create(props: UserProperties) {
		const user = new User(props);

		user.addEvent(new UserCreatedEvent(user.snapshot()));

		return user;
	}

	public validateAccount() {
		this.props.isValidated = true;
		this.addEvent(new UserAccountValidatedEvent(this.snapshot()));
	}

	public snapshot(): UserSnapshot {
		return { 
			password: this.props.password.unwrapOr(undefined), 
			id: this.props.id.value, 
			validationToken: this.props.validationToken.mapOr(undefined, (t) => t.value), 
			username: this.props.username, 
			email: this.props.email 
		}; 
	}

}