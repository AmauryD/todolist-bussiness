import { ControllerParamsContext, createCustomDecorator } from "@triptyk/nfw-http";
import { Maybe } from "true-myth";
import { isNothing, nothing } from "true-myth/maybe";
import Result, { err } from "true-myth/result";
import { ValidationError } from "yup";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";

export function extractContextRequestBody(context: ControllerParamsContext<unknown>) {
	const realBody = Maybe.of(context.ctx.request.body as Record<string, unknown>);
	if (isNothing(realBody)) {
		return nothing();
	}
	return Maybe.of(Object.values(realBody).at(0));
}

export const restBody = () => async (context: ControllerParamsContext<unknown>): Promise<Result<unknown, ValidationError | BodyMustNotBeEmptyError>> => {
	const maybeBody = extractContextRequestBody(context);
	if (isNothing(maybeBody)) {
		return err(new BodyMustNotBeEmptyError());
	}
	return maybeBody.value;
};

export function RestBody() {
	return createCustomDecorator(restBody(), "rest-body");
}

