import { RouterContext } from "@koa/router";
import { inject } from "@triptyk/nfw-core";
import { Controller, Ctx, GET, POST, UseMiddleware } from "@triptyk/nfw-http";
import { TodoListWebCreateController, TodoListWebListController } from "adapters";
import { RestBody } from "../decorators/rest-body.js";
import { DefaultErrorHandlerMiddleware } from "../error-handlers/default.js";

@Controller({
	routeName: "/api/v1/todo-lists"
})
@UseMiddleware(DefaultErrorHandlerMiddleware)
export class TodoListController {
	public constructor(
        @inject(TodoListWebCreateController) public todoListWebCreateController: TodoListWebCreateController,
		@inject(TodoListWebListController) public todoListWebListController: TodoListWebListController,
	) {}

	@GET("/")
	public list(@Ctx() ctx: RouterContext) {
		return this.todoListWebListController.list(ctx.state.user);
	}

	@POST("/")
	public async create(@RestBody() body: any) {
		if (body.isErr){
			throw body.error;
		} 
		return this.todoListWebCreateController.create(body.value);
	}
}