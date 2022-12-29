import { AggregateRoot } from "../../shared/entities/aggregate-root.js";

export interface UserProperties {
    username: string;
	email: string;
    password: string;
    id: string;
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