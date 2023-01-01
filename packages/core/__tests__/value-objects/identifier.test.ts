import assert from "node:assert";
import { it } from "node:test";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";

it("Equals when id are the same", () => {
	const id1 = Identifier.create("1"); 
	const id2 = Identifier.create("1"); 
	assert.strictEqual(id1.equals(id2), true);
});

it("Not equals when id are not the same", () => {
	const id1 = Identifier.create("1"); 
	const id2 = Identifier.create("2"); 
	assert.strictEqual(id1.equals(id2), false);
});