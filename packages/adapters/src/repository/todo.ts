import { TodoRepositoryInterface, Todo } from "todo-domain";
import { TodoDataSourceInterface } from "../interfaces/data-source/todo";

export class TodoRepository implements TodoRepositoryInterface {
    constructor(
        public dataSource: TodoDataSourceInterface
    ) {}

    listTodos(): Promise<Todo[]> {
        return this.dataSource.list();
    }

    createTodo(todo: Todo) {
        return this.dataSource.createOne(todo);
    }
}