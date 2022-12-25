import { CreateTodoListUseCase, ListTodoListsUseCase, TodoListAggregateRoot, TodoListRepositoryInterface, TodoListSnapshot } from "todo-domain";
import { TodoListController } from "../src/controllers/todo-list.controller.js";
import { DummyIdGenerator } from "./utils/id-generator.js";
import { JsonSerializer } from "./utils/json.serializer.js";
import { TodoListInMemoryRepository } from "./utils/todolist-memory-repository.js";
import { beforeEach, it } from "node:test";
import  assert  from "node:assert";

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

	assert.strictEqual(await todoListController.list(),
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
    
	assert.strictEqual(created,JSON.stringify({
		"id": "1",
		"name": "Remove kebab",
		"todos": [],
		"isDone": true
	}));
});