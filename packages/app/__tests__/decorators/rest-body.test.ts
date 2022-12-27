import "reflect-metadata";
import { it } from "node:test";
import { object, string, ValidationError } from "yup";
import { restBody } from "../../src/decorators/rest-body.js";
import assert from "node:assert";
import { Err } from "true-myth/result";
import { BodyMustNotBeEmptyError } from "../../src/errors/body-must-not-be-empty.js";

const testValidationSchema = object({
	a: string().required()
});

const restBodyValidation = async (body: unknown) => await restBody(testValidationSchema)({
	ctx: {
		request: {
			body
		}
	}
} as never);

it("Returns BodyMustNotBeEmpty Error when there is no body", async () => {
	const result = await restBodyValidation(undefined);
	assert.strictEqual(result.isErr, true);
	assert.strictEqual((result as Err<never, BodyMustNotBeEmptyError>).error.constructor, BodyMustNotBeEmptyError);
});


it("Return ValidationError there is a validation Error in the schema", async () => {
	const result = await restBodyValidation({});
	assert.strictEqual(result.isErr, true);
	assert.strictEqual((result as Err<never, ValidationError>).error.constructor, ValidationError);
});