import { inject } from "@triptyk/nfw-core";
import { Controller, GET, POST, UseMiddleware } from "@triptyk/nfw-http";
import { TodoListController as AdapterTodoListController, TodoListWeb } from "adapters";
import { Result } from "true-myth";
import { RestBody } from "../decorators/rest.body.js";
import { DefaultErrorHandlerMiddleware } from "../error-handlers/default.js";
import { BodyMustNotBeEmptyError } from "../errors/body-must-not-be-empty.js";

@Controller({
	routeName: "/api/v1/todo-lists"
})
@UseMiddleware(DefaultErrorHandlerMiddleware)
export class TodoListController {
	public constructor(
        @inject(AdapterTodoListController) public todoListAdapter: AdapterTodoListController,
	) {}

	@GET("/")
	public list() {
		return this.todoListAdapter.list();
	}

	@POST("/")
	public async create(@RestBody() body: Result<TodoListWeb, BodyMustNotBeEmptyError>) {
		if (body.isErr){
			throw body.error;
		} 
		const created = await this.todoListAdapter.create(body.value);
		if (created.isErr) {
			throw created.error;
		}
		return created.value;
	}
}