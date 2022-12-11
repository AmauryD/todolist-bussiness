import "reflect-metadata";
import { setupDI } from "./setup-di.js";

await setupDI();

import { container, singleton } from "@triptyk/nfw-core";
import { createApplication } from "@triptyk/nfw-http";
import Koa from "koa";
import { TodoListController } from "./controllers/todo-list.controller.js";
import { requestContext } from "@triptyk/nfw-mikro-orm";
import { MikroORM } from "@mikro-orm/core";
import cors from "@koa/cors";
import { TodoListSeeder } from "./database/seeders/todo-list.js";

@singleton()
export class Application {
	public async init() {
		const koa = new Koa();
		this.refreshDatabase();
		koa.use(requestContext);
		koa.use(cors({
			origin: "*"
		}));
        
		await createApplication({
			server: koa,
			controllers: [TodoListController]
		});
		koa.listen(8000, () => {
			console.log("listening on port 8000");
		});
	}

	private async refreshDatabase() {
		const schema = container.resolve(MikroORM).getSchemaGenerator();
		await schema.refreshDatabase();
		await this.seedDatabase();
	}

	private async seedDatabase() {
		const orm = container.resolve(MikroORM).getSeeder();
		await orm.seed(TodoListSeeder);
	}
}

new Application().init();