import assert from "node:assert";
import test, { it } from "node:test";
import { Ok } from "true-myth/result";
import { ValidationToken } from "../../src/index.js";

it("generates a non-empty string", () => {
	assert.strictEqual(ValidationToken.generate().value.length > 0, true);
});

test("parses an existing string to ValidationToken returns an error when string is empty", () => {
	assert.strictEqual(ValidationToken.from("").isErr, true);
});

it("equals another validationToken", () => {
	const t1 = ValidationToken.from("1") as Ok<ValidationToken, never>; 
	const t2 = ValidationToken.from("1") as Ok<ValidationToken, never>; 
	assert.strictEqual(t1.value.equals(t2.value), true);
});