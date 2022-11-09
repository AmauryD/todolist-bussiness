import { CreateTodoUseCase, Todo, TodoRepositoryInterface } from "../src";

describe('Create Todo', () => {
    let repository: TodoRepositoryInterface;

    class FakeRepository implements TodoRepositoryInterface {
        createTodo(todo: Todo): Todo {
            return todo;
        }
    }

    beforeEach(() => {
        repository = new FakeRepository();
    });

    it("Repository is used by use case", () => {
        const todoUseCase = new CreateTodoUseCase(repository);
        const createTodo = jest.spyOn(repository, 'createTodo');

        const todo = {
            title: 'clean kitchen',
            id: '1',
            done: false
        };

        expect(todoUseCase.execute(todo)).toStrictEqual(todo);
        expect(createTodo).toBeCalledWith(todo);
    });
})
