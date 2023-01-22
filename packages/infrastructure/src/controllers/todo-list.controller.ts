import { RouterContext } from "@koa/router";
import { inject } from "@triptyk/nfw-core";
import { Controller, Ctx, GET, POST, UseMiddleware } from "@triptyk/nfw-http";
import { TodoListWebCreateController, TodoListWebListController } from "adapters";
import { Result } from "true-myth";
import { RestBody } from "../decorators/rest-body.js";
import { DefaultErrorHandlerMiddleware } from "../error-handlers/default.js";
import { CurrentUserMiddleware } from "../middlewares/current-user.js";

@Controller({
	routeName: "/api/v1/todo-lists"
})
@UseMiddleware(DefaultErrorHandlerMiddleware)
@UseMiddleware(CurrentUserMiddleware)
export class TodoListController {
	public constructor(
		@inject(TodoListWebCreateController) public todoListWebCreateController: TodoListWebCreateController,
		@inject(TodoListWebListController) public todoListWebListController: TodoListWebListController,
	) {}

	@GET("/")
	public list(@Ctx() ctx: RouterContext) {
		return this.todoListWebListController.list(ctx.state.user?.id);
	}

	@POST("/")
	public async create(@RestBody() body: Result<Record<string, string>, Error>,@Ctx() ctx: RouterContext) {
		if (body.isErr){
			throw body.error;
		} 
		return this.todoListWebCreateController.create({
			userId: ctx.state.user?.id,
			name: body.value.name
		});
	}

	@POST("/:id/todo")
	public async createTodo(@RestBody() body: Result<Record<string, string>, Error>) {
		if (body.isErr){
			throw body.error;
		} 
		return this.todoListWebCreateController.create({
			userId: body.value.userId,
			name: body.value.name
		});
	}
}