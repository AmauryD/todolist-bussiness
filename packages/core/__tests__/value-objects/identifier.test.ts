import assert from "node:assert";
import { it } from "node:test";
import { Err, Ok } from "true-myth/result";
import { IdentifierMustNotBeEmptyError } from "../../src/domain/shared/errors/identifier-must-not-be-empty.js";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";

it("Returns IdMustNotBeEmptyError when trying to create an empty id", () => {
	const id = Identifier.create("") as Err<never, IdentifierMustNotBeEmptyError>; 
	assert.strictEqual(id.isErr, true);
	assert.strictEqual(id.error.constructor, IdentifierMustNotBeEmptyError);
});

it("Equals when id are the same", () => {
	const id1 = Identifier.create("1") as Ok<Identifier, never>; 
	const id2 = Identifier.create("1") as Ok<Identifier, never>; 
	assert.strictEqual(id1.value.equals(id2.value), true);
});

it("Not equals when id are not the same", () => {
	const id1 = Identifier.create("1") as Ok<Identifier, never>; 
	const id2 = Identifier.create("2") as Ok<Identifier, never>; 
	assert.strictEqual(id1.value.equals(id2.value), false);
});