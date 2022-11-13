import { CreateTodoRequest, CreateTodoUseCaseInterface, Todo } from "todo-domain";
import { TodoController } from "../src/controllers/todo";
import { TodoWeb } from "../src/interfaces/models/todo-web";

describe('Todo controller', () => {
    let usecase: CreateTodoUseCaseInterface;

    class FakeTodoUseCase implements CreateTodoUseCaseInterface {
        async execute(todo: CreateTodoRequest) {
            return todo;
        }
    }

    it('creates a todo for the web', async () => {
        const controller = new TodoController(
            new FakeTodoUseCase()
        );
        const todo: TodoWeb = {
            title: 'aa',
            done: false,
            id: 'aaa'
        };
        expect(await controller.create(todo)).toStrictEqual(todo);
    });
});