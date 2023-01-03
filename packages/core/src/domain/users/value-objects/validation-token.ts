import { randomUUID } from "crypto";
import { Result } from "true-myth";
import { err, ok } from "true-myth/result";
import { ValueObject } from "../../shared/value-objects/value-object.js";
import { ValidationTokenEmptyError } from "../errors/validation-token-empty.js";

export class ValidationToken implements ValueObject {
	private constructor(
        public readonly value: string
	) {}

	/**
	 * Why not use IDGenerator ? Because IDgenerator is for changing the behavior of generating resource Identifier.
	 * Validation Token generation behavior will never change
	 */
	public static generate() {
		return new ValidationToken(randomUUID());
	}

	public static from(string: string): Result<ValidationToken,  ValidationTokenEmptyError> {
		if (!string) {
			return err(new ValidationTokenEmptyError());
		}
		return ok(new ValidationToken(string));
	}

	public equals(other: this): boolean {
		return this.value === other.value;
	}
}