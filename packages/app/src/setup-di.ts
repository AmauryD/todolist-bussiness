import { container } from "@triptyk/nfw-core";
import { init } from "@triptyk/nfw-mikro-orm";
import { TodoListController as AdapterTodoListController } from "adapters";
import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";
import { todoListSchema } from "./database/models/todo-list.js";
import { todoSchema } from "./database/models/todo.js";
import { SQLTodoListRepository } from "./database/repositories/todo-list.repository.js";
import { TodoListsJsonApiSerializer } from "./serializers/json-api.serializer.js";
import { UUIDGenerator } from "./utils/id-generator.js";

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
	const createUseCase = new CreateTodoListUseCase(new UUIDGenerator(),todoListRepository);
	const controller = new AdapterTodoListController(useCase, createUseCase, new TodoListsJsonApiSerializer());

	container.register(AdapterTodoListController, {
		useValue: controller
	});
}