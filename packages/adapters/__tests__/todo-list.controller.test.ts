import { CreateTodoListUseCase, ListTodoListsUseCase, TodoListAggregateRoot, TodoListRepositoryInterface, TodoListSnapshot } from "todo-domain";
import { TodoListController } from "../src/controllers/todo-list.controller.js";
import { DummyIdGenerator } from "./fixtures/id-generator.js";
import { JsonSerializer } from "./fixtures/json.serializer.js";
import { TodoListInMemoryRepository } from "./fixtures/todolist-memory-repository.js";
import { beforeEach, it } from "node:test";
import  assert  from "node:assert";
import { unwrapOr } from "true-myth/result";
import { SuccessAuthorizer } from "./fixtures/success-authorizer.js";


function addAnAggregateToRepositoryList(repository: TodoListInMemoryRepository) {
	const firstAggregate = TodoListAggregateRoot.create({
		name: "aaa",
		id: "aaa"
	});
	if (firstAggregate.isOk) {
		repository.todos.push(firstAggregate.value);
	}
	return firstAggregate;
}

let repository: TodoListRepositoryInterface;
let listTodoListsUseCase: ListTodoListsUseCase;
let createTodoListsUseCase: CreateTodoListUseCase;

beforeEach(() => {
	repository = new TodoListInMemoryRepository();
	listTodoListsUseCase = new ListTodoListsUseCase(
		repository,
		new SuccessAuthorizer()
	);
	createTodoListsUseCase = new CreateTodoListUseCase(
		new DummyIdGenerator(),
		repository
	);
});

it("Lists todo-lists", async () => {
	const todoListController = new TodoListController(
		listTodoListsUseCase,
		undefined as never,
		new JsonSerializer()
	);

	const firstAggregate = addAnAggregateToRepositoryList(repository as TodoListInMemoryRepository);

	const snapshot = firstAggregate.match({
		Ok(value) {
			return value.snapshot();
		},
		Err() { return {} as TodoListSnapshot; },
	});

	const list = await todoListController.list("someUser");
	
	assert.strictEqual(list.isOk, true);
	assert.strictEqual(list.unwrapOr({}),
		JSON.stringify([snapshot])
	);
});

it("Creates todo-list", async () => {
	const todoListController = new TodoListController(
		listTodoListsUseCase,
		createTodoListsUseCase,
		new JsonSerializer()
	);

	const created = await todoListController.create({
		name: "Remove kebab"
	});
    
	assert.strictEqual(unwrapOr("",created),JSON.stringify({
		"id": "1",
		"name": "Remove kebab",
		"todos": [],
		"isDone": true
	}));
});