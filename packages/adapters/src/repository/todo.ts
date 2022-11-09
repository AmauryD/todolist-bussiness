import { TodoRepositoryInterface, Todo } from "todo-domain";


export class TodoRepository implements TodoRepositoryInterface {
    constructor() {}

    createTodo(todo: Todo): Todo {
        return {} as Todo
    }
}