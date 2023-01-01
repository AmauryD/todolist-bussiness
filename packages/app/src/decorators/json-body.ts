import { ControllerParamsContext, createCustomDecorator } from "@triptyk/nfw-http";
import Maybe from "true-myth/maybe";
import Result, { err } from "true-myth/result";
import { Schema, ValidationError } from "yup";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";
import { validateSchema } from "./rest-body.js";

export const jsonBody = (schema: Schema) => async (context: ControllerParamsContext<unknown>): Promise<Result<unknown, ValidationError | BodyMustNotBeEmptyError>> => {
	const maybeBody = Maybe.of(context.ctx.request.body as Record<string, unknown>);
	const result = maybeBody.map((body) => validateSchema(schema,body));
	return result.unwrapOr(err(new BodyMustNotBeEmptyError()));
};

export function Body(schema: Schema) {
	return createCustomDecorator(jsonBody(schema), "rest-body");
}

