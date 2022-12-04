import { CreateTodoUseCase, TodoReadRepositoryInterface } from "../src";
import { FakeRepository } from "../__mocks__/fake-repository.js";

describe('Create Todo', () => {
    let repository: TodoReadRepositoryInterface;

    beforeEach(() => {
        repository = new FakeRepository();
    });

    it("Repository is used by use case", async () => {
        const todoUseCase = new CreateTodoUseCase(repository);
        const createTodo = jest.spyOn(repository, 'createTodo');

        const todo = {
            title: 'clean kitchen',
            id: '1',
            done: false
        };

        expect(await todoUseCase.execute(todo)).toStrictEqual(todo);
        expect(createTodo).toBeCalledWith(todo);
    });
})
