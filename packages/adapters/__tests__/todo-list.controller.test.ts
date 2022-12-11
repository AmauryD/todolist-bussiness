import { CreateTodoListUseCase, ListTodoListsUseCase, TodoListAggregateRoot, TodoListRepositoryInterface } from "todo-domain";
import { TodoListController } from "../src/controllers/todo-list.controller.js";
import { DummyIdGenerator } from "./utils/id-generator.js";
import { TodoListInMemoryRepository } from "./utils/todolist-memory-repository.js";

function addAnAggregateToRepositoryList(repository: TodoListInMemoryRepository) {
	const firstAggregate = TodoListAggregateRoot.create({
		name: "aaa",
		id: "aaa"
	});
	repository.todos.push(firstAggregate);
	return firstAggregate;
}

let repository: TodoListRepositoryInterface;
let listTodoListsUseCase: ListTodoListsUseCase;
let createTodoListsUseCase: CreateTodoListUseCase;

beforeEach(() => {
	repository = new TodoListInMemoryRepository();
	listTodoListsUseCase = new ListTodoListsUseCase(
		repository
	);
	createTodoListsUseCase = new CreateTodoListUseCase(
		new DummyIdGenerator(),
		repository
	);
});

it("Lists todo-lists", async () => {
	const todoListController = new TodoListController(
		listTodoListsUseCase,
		undefined as never
	);

	const firstAggregate = addAnAggregateToRepositoryList(repository as TodoListInMemoryRepository);

    
	expect(await todoListController.list()).toStrictEqual([firstAggregate.snapshot()]);
});

it("Creates todo-list", async () => {
	const todoListController = new TodoListController(
		listTodoListsUseCase,
		createTodoListsUseCase
	);
    
	expect(await todoListController.create({
		name: "Remove kebab"
	})).toStrictEqual({
		"id": "1",
		"name": "Remove kebab",
		"todos": [],
	});
});