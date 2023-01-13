import { container } from "@triptyk/nfw-core";
import { ConfirmationMailFormatter, RegisterWebController, TodoListsWebPresenter, TodoListWebPresenter, ValidateAccountWebController, LoginWebController, TodoListWebCreateController, TodoListWebListController } from "adapters";
import { ConfirmationMailListener, CreateTodoListUseCase, ListTodoListsUseCase, LoginUseCase, RegisterUseCase, SendConfirmationMailUseCase, ValidateAccountUseCase } from "todo-domain";
import { SQLTodoListRepository } from "./database/repositories/todo-list.repository.js";
import { SQLUserRepository } from "./database/repositories/user.repository.js";

import { AuthService } from "adapters";
import { UUIDGenerator } from "adapters";
import { IAmBrokeAFMailService } from "./services/no-money-mail.js";
import { UserPresenter, UserErrorPresenter } from "adapters";

export async function setupDI() {
	registerTodoListAdapter();
	registerAuthAdapter();
	setupConfirmationMailListener();
}

function setupConfirmationMailListener() {
	const confirmationMailUseCase = new SendConfirmationMailUseCase(
		new IAmBrokeAFMailService(),
		new ConfirmationMailFormatter()
	);
	const listener = new ConfirmationMailListener(
		confirmationMailUseCase
	);
	listener.setup();
}

function registerAuthAdapter() {
	const userRepository = new SQLUserRepository();

	const loginUseCase = new LoginUseCase(
		userRepository,
		new UserPresenter(),
		new UserErrorPresenter(),
		new AuthService()
	);

	const registerUseCase = new RegisterUseCase(
		userRepository,
		new UserPresenter(),
		new UserErrorPresenter(),
		new UUIDGenerator()
	);

	const validateAccountUseCase = new ValidateAccountUseCase(
		userRepository,
		new UserErrorPresenter(),
		new UserPresenter()
	);


	const authControllerAdapter = new ValidateAccountWebController(validateAccountUseCase);
	const registerControllerAdapter = new RegisterWebController(registerUseCase);
	const loginControllerAdapter = new LoginWebController(loginUseCase);

	container.register(ValidateAccountWebController, {
		useValue: authControllerAdapter
	});
	container.register(RegisterWebController, {
		useValue: registerControllerAdapter
	});
	container.register(LoginWebController, {
		useValue: loginControllerAdapter
	});
}

function registerTodoListAdapter() {
	const todoListRepository = new SQLTodoListRepository();
	const useCase = new ListTodoListsUseCase(
		todoListRepository,
		new TodoListsWebPresenter()
	);
	const createUseCase = new CreateTodoListUseCase(
		new UUIDGenerator(),
		todoListRepository,
		new TodoListWebPresenter()
	);

	const todoListWebCreateController = new TodoListWebCreateController(createUseCase);
	const todoListWebListController = new TodoListWebListController(useCase);

	container.register(TodoListWebCreateController, {
		useValue: todoListWebCreateController
	});
	container.register(TodoListWebListController, {
		useValue: todoListWebListController
	});
}

