import { container } from "@triptyk/nfw-core";
import { init } from "@triptyk/nfw-mikro-orm";
import { TodoListController as AdapterTodoListController } from "adapters";
import { ListTodoListsUseCase } from "todo-domain";
import { todoListSchema } from "./models/todo-list.js";
import { todoSchema } from "./models/todo.js";
import { SQLTodoListRepository } from "./repositories/todo-list.repository.js";

export async function setupDI() {
	await init(
		{
			type: "sqlite",
			dbName: ":memory:",
			entities: [todoSchema, todoListSchema]
		}
	);

	const todoListRepository = new SQLTodoListRepository();
	const useCase = new ListTodoListsUseCase(todoListRepository);
	const controller = new AdapterTodoListController(useCase);

	container.register(AdapterTodoListController, {
		useValue: controller
	});
}