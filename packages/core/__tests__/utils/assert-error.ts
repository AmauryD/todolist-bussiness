import assert from "assert";
import { Result } from "true-myth";
import { Err } from "true-myth/result";
import { Class } from "type-fest";

export function assertError<R,E extends Error>(result: Result<R, E>, error: Class<E>) {
	assert.strictEqual(result.isErr, true);
	assert.strictEqual((result as Err<never,E>).error.constructor, error);
}
