import { DefaultErrorHandlerMiddleware } from "../../../src/error-handlers/default.js";
import { it } from "node:test";
import assert from "node:assert";

const fakeControllerAction = async () => {
	throw new Error("Blah");
};

it("Handles errors correctly", async () => {
	const middleware = new DefaultErrorHandlerMiddleware();
	const ctx = {
		body: undefined,
		status: undefined
	};

	await middleware.use(ctx as never,fakeControllerAction);
	assert.strictEqual(ctx.status,500);
	assert.deepStrictEqual(ctx.body,{
		details: "InternalServerError",
		code: "InternalServerError",
		name: "InternalServerError"
	});
});