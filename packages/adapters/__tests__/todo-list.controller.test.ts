import { CreateTodoListUseCase, ListTodoListsUseCase, TodoListAggregateRoot, TodoListRepositoryInterface, TodoListSnapshot } from "todo-domain";
import { TodoListController } from "../src/controllers/todo-list.js";
import { DummyIdGenerator } from "./fixtures/id-generator.js";
import { TodoListInMemoryRepository } from "./fixtures/todolist-memory-repository.js";
import { beforeEach, it } from "node:test";
import  assert  from "node:assert";
import { Ok, unwrapOr } from "true-myth/result";
import { Identifier } from "todo-domain/domain/shared/value-objects/identifier.js";


function addAnAggregateToRepositoryList(repository: TodoListInMemoryRepository) {
	const firstAggregate = TodoListAggregateRoot.create({
		name: "aaa",
		id: (Identifier.create("aaa") as Ok<Identifier, never>).value
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
		{
			async present(data) {
				return data;
			},
		}
	);
	createTodoListsUseCase = new CreateTodoListUseCase(
		new DummyIdGenerator(),
		repository,
		{
			async present(data) {
				return data;
			},
		}
	);
});

it("Lists todo-lists", async () => {
	const todoListController = new TodoListController(
		listTodoListsUseCase,
		undefined as never
	);

	const firstAggregate = addAnAggregateToRepositoryList(repository as TodoListInMemoryRepository);

	const snapshot = firstAggregate.match({
		Ok(value) {
			return value.snapshot();
		},
		Err() { return {} as TodoListSnapshot; },
	});

	const list = await todoListController.list();
	
	assert.strictEqual(list.isOk, true);
	assert.deepStrictEqual(list.unwrapOr({}),
		[snapshot]
	);
});

it("Creates todo-list", async () => {
	const todoListController = new TodoListController(
		listTodoListsUseCase,
		createTodoListsUseCase
	);

	const created = await todoListController.create({
		name: "Remove kebab"
	});
    
	assert.deepStrictEqual(unwrapOr("",created),{
		"id": "1",
		"name": "Remove kebab",
		"todos": [],
		"isDone": true
	});
});