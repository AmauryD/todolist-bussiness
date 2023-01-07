import { RouterContext } from "@koa/router";
import { MiddlewareInterface } from "@triptyk/nfw-http";
import { WebError } from "adapters";
import { DefaultState, DefaultContext, Next } from "koa";

export class DefaultErrorHandlerMiddleware implements MiddlewareInterface {
	public async use(context: RouterContext<DefaultState, DefaultContext, unknown>, next: Next): Promise<void> {
		try {
			await next();
		}catch(e) {
			console.log(e);
			
			if (e instanceof WebError) {
				context.body = {
					code: e.original.constructor.name,
					name: e.original.name,
					details: e.original.message,
				};
				context.status = e.code;
				return;
			}

			context.body = {
				code: "InternalServerError",
				name: "InternalServerError",
				details: "InternalServerError"
			};
			context.status = 500;
		}
	}
}