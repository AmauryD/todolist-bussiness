import { container } from "@triptyk/nfw-core";
import { ConfirmationMailFormatter, TodoListsWebPresenter, TodoListWebPresenter, WebAuthController, WebTodoListController } from "adapters";
import { ConfirmationMailListener, CreateTodoListUseCase, ListTodoListsUseCase, LoginUseCase, RegisterUseCase, SendConfirmationMailUseCase, ValidateAccountUseCase } from "todo-domain";
import { SQLTodoListRepository } from "./database/repositories/todo-list.repository.js";
import { SQLUserRepository } from "./database/repositories/user.repository.js";

import { AuthService } from "adapters";
import { UUIDGenerator } from "adapters";
import { IAmBrokeAFMailService } from "./services/no-money-mail.js";

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
		{} as never,
		new AuthService()
	);

	const registerUseCase = new RegisterUseCase(
		userRepository,
		{} as never,
		{} as never,
		new UUIDGenerator()
	);

	const validateAccountUseCase = new ValidateAccountUseCase(
		userRepository
	);


	const authControllerAdapter = new WebAuthController(loginUseCase, registerUseCase, validateAccountUseCase);

	container.register(WebAuthController, {
		useValue: authControllerAdapter
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
	const controller = new WebTodoListController(useCase, createUseCase);

	container.register(WebTodoListController, {
		useValue: controller
	});
}

