import type { RouterContext } from "@koa/router";
import type { Next } from "koa";
import jwt from "jsonwebtoken";
import { container, injectable } from "@triptyk/nfw-core";
import type { MiddlewareInterface } from "@triptyk/nfw-http";
import { UserModel } from "../database/models/user.js";
import { MikroORM,EntityRepository } from "@mikro-orm/core";

export async function loadUserFromContext (context: RouterContext, userRepo: EntityRepository<UserModel>): Promise<UserModel | undefined> {
	if (context.header.authorization) {
		const [prefix,bearerToken] = context.header.authorization.split(" ");
		if (prefix === "Bearer") {
			const decrypted = jwt.verify(bearerToken, "123456", { complete: true });
			const user = await userRepo.findOne({ id: (decrypted.payload as jwt.JwtPayload).sub });
			if (!user) {
				throw new Error("Invalid token");
			}
			return user;
		} else {
			throw new Error("Invalid token");
		}
	}
	return undefined;
}

@injectable()
export class CurrentUserMiddleware implements MiddlewareInterface {
	public async use (context: RouterContext, next: Next) {
		const userRepository = container.resolve(MikroORM).em.getRepository<UserModel>("User");
		context.state.user = await loadUserFromContext(context, userRepository);
		await next();
	}
}
