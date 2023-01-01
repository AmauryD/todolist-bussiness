import { Ok } from "true-myth/result";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";

/**
 * Yes, i know what i am doing
 */
export function identifier(str: string) {
	return (Identifier.create(str) as Ok<Identifier, never>).value;
}