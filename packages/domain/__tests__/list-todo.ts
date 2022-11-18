import { TodoRepositoryInterface } from "../src/index.js";
import { ListTodoUseCase } from "../src/use-case/list-todo.js";
import { FakeRepository } from "../__mocks__/fake-repository.js";

describe('Use case list todos', () => {
    let repository : TodoRepositoryInterface;

    beforeEach(() => {
        repository = new FakeRepository();
    })

    test('It returns a list of todo', async () => {
        const useCase = new ListTodoUseCase(
            repository
        );

        expect(await useCase.execute()).toStrictEqual([]);
    });
});