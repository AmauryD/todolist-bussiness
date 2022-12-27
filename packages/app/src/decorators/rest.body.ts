import { ControllerParamsContext, createCustomDecorator } from "@triptyk/nfw-http";
import { Maybe } from "true-myth";
import { isNothing } from "true-myth/maybe";
import { err, ok } from "true-myth/result";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";

function extractBody(context: ControllerParamsContext<unknown>) {
	const realBody = context.ctx.request.body as Record<string, unknown>;
	return Maybe.of(Object.values(realBody).at(0));
}

export function RestBody() {
	return createCustomDecorator((context) => {
		const maybeBody = extractBody(context);
		if (isNothing(maybeBody)) {
			return err(new BodyMustNotBeEmptyError());
		}
		return ok(maybeBody.value);
	}, "rest-body");
}

