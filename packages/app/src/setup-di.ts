import { container } from "@triptyk/nfw-core";
import { TodoListController as AdapterTodoListController } from "adapters";
import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";
import { SQLTodoListRepository } from "./database/repositories/todo-list.repository.js";
import { TodoListsRESTSerializer } from "./serializers/rest.js";
import { UUIDGenerator } from "./utils/id-generator.js";

export async function setupDI() {
	const todoListRepository = new SQLTodoListRepository();
	const useCase = new ListTodoListsUseCase(
		todoListRepository,
		new TodoListsRESTSerializer("todoLists")
	);
	const createUseCase = new CreateTodoListUseCase(
		new UUIDGenerator(),
		todoListRepository,
		new TodoListsRESTSerializer("todoLists")
	);
	const controller = new AdapterTodoListController(useCase, createUseCase);

	container.register(AdapterTodoListController, {
		useValue: controller
	});
}