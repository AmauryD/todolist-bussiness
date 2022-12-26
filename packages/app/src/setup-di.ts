import { container } from "@triptyk/nfw-core";
import { TodoListController as AdapterTodoListController } from "adapters";
import { CreateTodoListUseCase, ListTodoListsUseCase } from "todo-domain";
import { SQLTodoListRepository } from "./database/repositories/todo-list.repository.js";
import { TodoListsRESTSerializer } from "./serializers/rest.serializer.js";
import { UUIDGenerator } from "./utils/id-generator.js";

export async function setupDI() {
	const todoListRepository = new SQLTodoListRepository();
	const useCase = new ListTodoListsUseCase(todoListRepository);
	const createUseCase = new CreateTodoListUseCase(new UUIDGenerator(),todoListRepository);
	const controller = new AdapterTodoListController(useCase, createUseCase, new TodoListsRESTSerializer("todoLists"));

	container.register(AdapterTodoListController, {
		useValue: controller
	});
}