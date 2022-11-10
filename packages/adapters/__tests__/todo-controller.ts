import { CreateTodoRequest, CreateTodoUseCaseInterface, Todo } from "todo-domain";
import { TodoController } from "../src/controllers/todo";
import { TodoWeb } from "../src/interfaces/models/todo-web";

describe('Todo controller', () => {
    let usecase: CreateTodoUseCaseInterface;

    class FakeTodoUseCase implements CreateTodoUseCaseInterface {
        execute(todo: CreateTodoRequest): Todo {
            return todo;
        }
    }

    it('creates a todo for the web', () => {
        const controller = new TodoController(
            new FakeTodoUseCase()
        );
        const todo: TodoWeb = {
            title: 'aa',
            done: false,
            id: 'aaa'
        };
        expect(controller.create(todo)).toStrictEqual(todo);
    });
});