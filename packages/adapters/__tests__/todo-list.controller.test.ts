import { ListTodoListsUseCase, TodoListAggregateRoot } from "todo-domain";
import { TodoListController } from "../src/controllers/todo-list.controller.js";
import { TodoListInMemoryRepository } from "./utils/todolist-memory-repository.js";

function addAnAggregateToRepositoryList(repository: TodoListInMemoryRepository) {
	const firstAggregate = TodoListAggregateRoot.create({
		name: "aaa",
		id: "aaa"
	});
	repository.todos.push(firstAggregate);
	return firstAggregate;
}


it("Lists todo-lists", () => {
	const repository = new TodoListInMemoryRepository();
	const todoListUseCase = new ListTodoListsUseCase(
		repository
	);
	const todoListController = new TodoListController(
		todoListUseCase
	);

	const firstAggregate = addAnAggregateToRepositoryList(repository);

    
	expect(todoListController.list()).toStrictEqual([firstAggregate.snapshot()]);
});