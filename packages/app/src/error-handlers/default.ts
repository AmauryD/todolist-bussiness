import { RouterContext } from "@koa/router";
import { MiddlewareInterface } from "@triptyk/nfw-http";
import { DefaultState, DefaultContext, Next } from "koa";
import { TodoListNameRequiredError } from "todo-domain";
import { Class } from "type-fest";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";

const errorsStatuses = new Map<Class<Error>, number>([
	[TodoListNameRequiredError, 400],
	[BodyMustNotBeEmptyError, 400]
]);

export class DefaultErrorHandlerMiddleware implements MiddlewareInterface {
	public async use(context: RouterContext<DefaultState, DefaultContext, unknown>, next: Next): Promise<void> {
		try {
			await next();
		}catch(e) {
			console.log(e);
			if (e instanceof Error) {
				context.body = {
					code: e.name,
					details: e.message,
				};
				context.status = errorsStatuses.get(e.constructor as Class<Error>) ?? 500;
			}
		}
	}
}