import { inject } from "@triptyk/nfw-core";
import { Body, Controller, GET, POST } from "@triptyk/nfw-http";
import { TodoListController as AdapterTodoListController, TodoListWeb } from "adapters";

@Controller({
	routeName: "/api/v1/todo-lists"
})
export class TodoListController {
	public constructor(
        @inject(AdapterTodoListController) public todoListAdapter: AdapterTodoListController,
	) {}

	@GET("/")
	public list() {
		return this.todoListAdapter.list();
	}

	@POST("/")
	public async create(@Body() body: TodoListWeb) {
		const created = await this.todoListAdapter.create(body);
		if (created.isErr) {
			throw created.error;
		}
		return created.value;
	}
}