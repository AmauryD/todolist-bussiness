import { ControllerParamsContext, createCustomDecorator } from "@triptyk/nfw-http";
import { Maybe } from "true-myth";
import { isNothing, nothing } from "true-myth/maybe";
import Result, { err, ok } from "true-myth/result";
import { InferType, Schema, ValidationError } from "yup";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";

function extractBody(context: ControllerParamsContext<unknown>) {
	const realBody = Maybe.of(context.ctx.request.body as Record<string, unknown>);
	if (isNothing(realBody)) {
		return nothing();
	}
	return Maybe.of(Object.values(realBody).at(0));
}

async function validateSchema<T extends Schema, E extends InferType<T>>(schema: T, body: unknown): Promise<Result<E, ValidationError>> {
	try {
		const validated = await schema.validate(body);
		return ok(validated);
	} catch(e) {
		return err(e as ValidationError);
	}
}

export const restBody = (schema: Schema) => async (context: ControllerParamsContext<unknown>): Promise<Result<unknown, ValidationError | BodyMustNotBeEmptyError>> => {
	const maybeBody = extractBody(context);
	if (isNothing(maybeBody)) {
		return err(new BodyMustNotBeEmptyError());
	}
	return validateSchema(schema,maybeBody.value);
};

export function RestBody(schema: Schema) {
	return createCustomDecorator(restBody(schema), "rest-body");
}

