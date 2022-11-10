import { TodoRepositoryInterface, Todo } from "todo-domain";
import { TodoDataSourceInterface } from "../interfaces/data-source/todo";

export class TodoRepository implements TodoRepositoryInterface {
    constructor(
        public dataSource: TodoDataSourceInterface
    ) {}

    createTodo(todo: Todo) {
        return this.dataSource.createOne(todo);
    }
}