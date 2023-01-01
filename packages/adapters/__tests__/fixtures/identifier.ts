import { Identifier } from "todo-domain/index.js";
import { Ok } from "true-myth/result";

/**
 * Yes, i know what i am doing
 */
export function identifier(str: string) {
	return (Identifier.create(str) as Ok<Identifier, never>).value;
}