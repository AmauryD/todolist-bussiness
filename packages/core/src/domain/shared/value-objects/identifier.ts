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

	public static create(id: string): Identifier {
		const trimmed = id.trim();

		return new Identifier(trimmed);
	}

	public equals(other: this): boolean {
		return this.value === other.value;
	}
}