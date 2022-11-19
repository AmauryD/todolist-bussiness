import { CreateTodoRequest, CreateTodoUseCase, CreateTodoUseCaseInterface, GetOneTodoUseCase, ListTodoUseCase, Todo } from "todo-domain";
import { ListTodoUseCaseInterface } from "todo-domain/src/interfaces/use-case/list-todo.js";
import { TodoController } from "../src/controllers/todo";
import { TodoDataSourceInterface, TodoRepository } from "../src/index.js";
import { TodoWeb } from "../src/interfaces/models/todo-web";

describe('Todo controller', () => {
    let datasource: TodoDataSourceInterface;
    let controller: TodoController;

    class FakeTodoDatasource  implements TodoDataSourceInterface {
        async getOne(id: string): Promise<Todo> {
            return {
                title: '',
                done: false,
                id
            };
        }

        createOne(contactData: Todo): Todo | Promise<Todo> {
            return contactData;
        }
        async list(): Promise<Todo[]> {
            return [];
        }
    }

    beforeEach(() => {
        datasource = new FakeTodoDatasource();
        const repository = new TodoRepository(datasource);
        controller = new TodoController(
            new CreateTodoUseCase(repository),
            new ListTodoUseCase(repository),
            new GetOneTodoUseCase(repository)
        );
    });

    it('creates a todo for the web', async () => {
        const todo: TodoWeb = {
            title: 'aa',
            done: false,
            id: 'aaa'
        };
        expect(await controller.create(todo)).toStrictEqual(todo);
    });


    it('list a todo for the web', async () => {
        const todo: TodoWeb = {
            title: 'aa',
            done: false,
            id: 'aaa'
        };
        expect(await controller.list()).toStrictEqual([]);
    });
});