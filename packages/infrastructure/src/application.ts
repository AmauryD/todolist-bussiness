import "reflect-metadata";
import { setupDI } from "./setup-di.js";
import { container, singleton } from "@triptyk/nfw-core";
import { createApplication } from "@triptyk/nfw-http";
import Koa from "koa";
import { MikroORM } from "@mikro-orm/core";
import { TodoListController } from "./controllers/todo-list.controller.js";
import { init, requestContext } from "@triptyk/nfw-mikro-orm";
import cors from "@koa/cors";
import { TodoListSeeder } from "./database/seeders/todo-list.js";
import { todoListSchema } from "./database/models/todo-list.js";
import { todoSchema } from "./database/models/todo.js";
import {koaBody} from "koa-body";
import { AuthController } from "./controllers/auth.controller.js";
import { userSchema } from "./database/models/user.js";
import { AfterCreationSubscriber } from "./database/subscribers/after.js";
import { refreshTokenSchema } from "./database/models/refresh-token.js";

@singleton()
export class Application {
	public async init() {
		const koa = new Koa();

		await this.setupDatabaseConnection();
		await setupDI();
		// await this.refreshDatabase();

		koa.use(requestContext);
		koa.use(koaBody());
		koa.use(cors({
			origin: "*"
		}));
        
		await createApplication({
			server: koa,
			controllers: [TodoListController,AuthController]
		});
		
		koa.listen(8000, () => {
			console.log("listening on port 8000");
		});
	}

	private async setupDatabaseConnection() {
		await init(
			{
				type: "sqlite",
				dbName: "todo-list",
				subscribers: [new AfterCreationSubscriber()],
				entities: [todoSchema, todoListSchema, userSchema, refreshTokenSchema]
			}
		);
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