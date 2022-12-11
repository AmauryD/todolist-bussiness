import { inject } from "@triptyk/nfw-core";
import { Controller, GET } from "@triptyk/nfw-http";
import { TodoListController as AdapterTodoListController } from "adapters";

@Controller({
	routeName: "/todo-list"
})
export class TodoListController {
	public constructor(
        @inject(AdapterTodoListController) public listTodoListAdapter: AdapterTodoListController
	) {}

	@GET("/")
	public list() {
		return this.listTodoListAdapter.list();
	}
}