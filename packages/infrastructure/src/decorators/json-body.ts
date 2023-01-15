import { ControllerParamsContext, createCustomDecorator } from "@triptyk/nfw-http";
import Maybe from "true-myth/maybe";
import { fromMaybe } from "true-myth/toolbelt";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";

export const jsonBody = () => async (context: ControllerParamsContext<unknown>) => {
	const maybeBody = Maybe.of(context.ctx.request.body as Record<string, unknown>);
	return fromMaybe(new BodyMustNotBeEmptyError(), maybeBody);
};

export function Body() {
	return createCustomDecorator(jsonBody(), "rest-body");
}

