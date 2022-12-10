import { IdGeneratorInterface } from "../../src/interfaces/id-generator.js";
import { CreateTodoListUseCase } from "../../src/use-cases/todo-list/create.js";
import { FakeTodoListRepository } from "./common.js";

class IdGenerator implements IdGeneratorInterface {
	public generate(): string {
		return "1";
	}
}


test("It creates a todo-list", () => {
	const createTodoListUseCase = new CreateTodoListUseCase(
		new IdGenerator(),
		new FakeTodoListRepository()
	);
	const todoSnapshot = createTodoListUseCase.execute({
		name: "name"
	});
	expect(todoSnapshot).toStrictEqual({
		name: "name",
		id: "1",
		todos: []
	});
});