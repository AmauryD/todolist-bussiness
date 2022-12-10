import "reflect-metadata";
import { setupDI } from "./setup-di.js";

await setupDI();

import { container, singleton } from "@triptyk/nfw-core";
import { createApplication } from "@triptyk/nfw-http";
import Koa from "koa";
import { TodoListController } from "./controllers/todo-list.controller.js";
import { requestContext } from "@triptyk/nfw-mikro-orm";
import { MikroORM } from "@mikro-orm/core";


@singleton()
export class Application {
	public async init() {
		const koa = new Koa();
		const schema = container.resolve(MikroORM).getSchemaGenerator();
		schema.refreshDatabase();
		koa.use(requestContext);
        
		await createApplication({
			server: koa,
			controllers: [TodoListController]
		});
		koa.listen(8000, () => {
			console.log("listening on port 8000");
		});
	}
}

new Application().init();