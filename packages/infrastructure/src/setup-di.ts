import { container } from "@triptyk/nfw-core";
import { ConfirmationMailFormatter, RegisterWebController, TodoListsWebPresenter, TodoListWebPresenter, ValidateAccountWebController, LoginWebController, TodoListWebCreateController, TodoListWebListController, TodoListErrorPresenter, LoggedUserPresenter, PasswordHasherService } from "adapters";
import { ConfirmationMailListener, CreateTodoListUseCase, ListTodoListsUseCase, LoginUseCase, RegisterUseCase, SendConfirmationMailUseCase, ValidateAccountUseCase } from "todo-domain";
import { SQLTodoListRepository } from "./database/repositories/todo-list.js";
import { SQLUserRepository } from "./database/repositories/user.js";

import { AuthService } from "adapters";
import { UUIDGenerator } from "adapters";
import { IAmBrokeAFMailService } from "./services/no-money-mail.js";
import { UserPresenter, UserErrorPresenter } from "adapters";
import { SQLAuthRepository } from "./database/repositories/auth.js";

export async function setupDI() {
	registerTodoListAdapter();
	registerAuthAdapter();
	setupConfirmationMailListener();
}

function setupConfirmationMailListener() {
	const confirmationMailUseCase = new SendConfirmationMailUseCase(
		new IAmBrokeAFMailService(),
		new ConfirmationMailFormatter("http://localhost:8000")
	);
	const listener = new ConfirmationMailListener(
		confirmationMailUseCase
	);
	listener.setup();
}

function registerAuthAdapter() {
	const userRepository = new SQLUserRepository();
	const authRepository = new SQLAuthRepository();

	const loginUseCase = new LoginUseCase(
		userRepository,
		authRepository,
		new LoggedUserPresenter(),
		new UserErrorPresenter(),
		new AuthService({
			secret: "123456",
			expirationTimeInHours: 1,
			issuer: "me"
		})
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
		new UserPresenter(),
		new PasswordHasherService()
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
		new TodoListsWebPresenter(),
		new TodoListErrorPresenter()
	);
	const createUseCase = new CreateTodoListUseCase(
		new UUIDGenerator(),
		todoListRepository,
		new TodoListWebPresenter(),
		new TodoListErrorPresenter()
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

