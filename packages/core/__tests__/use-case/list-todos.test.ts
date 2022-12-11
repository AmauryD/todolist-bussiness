
import { ListTodoListsUseCase } from "../../src/use-cases/todo-list/list.js";
import { FakeTodoListRepository } from "./common.js";

it("Lists todo-lists", async () => {
	const listTodoListsUseCase = new ListTodoListsUseCase(
		new FakeTodoListRepository()
	);

	expect(await listTodoListsUseCase.execute()).toStrictEqual([{
		id: "1",
		name: "title",
		todos: []
	}]);
});