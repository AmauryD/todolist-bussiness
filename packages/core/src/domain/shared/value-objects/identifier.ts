import { Result } from "true-myth";
import { err, ok } from "true-myth/result";
import { IdentifierMustNotBeEmptyError } from "../errors/identifier-must-not-be-empty.js";
import { ValueObject } from "./value-object.js";

export class Identifier extends ValueObject {
	private constructor(
        private id: string
	) {
		super();
	}

	public get value() {
		return this.id;
	}

	public static create(id: string): Result<Identifier, IdentifierMustNotBeEmptyError> {
		const trimmed = id.trim();

		if (!trimmed) {
			return err(new IdentifierMustNotBeEmptyError());
		}

		return ok(
			new Identifier(trimmed)
		);
	}

	public equals(other: this): boolean {
		return this.value === other.value;
	}
}