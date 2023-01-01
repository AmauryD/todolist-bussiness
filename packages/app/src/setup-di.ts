import { container } from "@triptyk/nfw-core";
import { WebAuthController, WebTodoListController } from "adapters";
import { CreateTodoListUseCase, ListTodoListsUseCase, LoginUseCase, RegisterUseCase } from "todo-domain";
import { SQLTodoListRepository } from "./database/repositories/todo-list.repository.js";
import { SQLUserRepository } from "./database/repositories/user.repository.js";
import { TodoListsRESTSerializer } from "./serializers/rest.js";
import { AuthService } from "./services/auth.js";
import { UUIDGenerator } from "./services/id-generator.js";

export async function setupDI() {
	setupTodoListAdapter();
	const userRepository = new SQLUserRepository();

	const loginUseCase = new LoginUseCase(
		userRepository,
		new TodoListsRESTSerializer("todoLists"),
		new AuthService()
	);

	const registerUseCase = new RegisterUseCase(
		userRepository,
		new UUIDGenerator()
	);
	

	const authControllerAdapter = new WebAuthController(loginUseCase,registerUseCase);

	container.register(WebAuthController, {
		useValue: authControllerAdapter
	});
}

function setupTodoListAdapter() {
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
	const controller = new WebTodoListController(useCase, createUseCase);

	container.register(WebTodoListController, {
		useValue: controller
	});
}
