import { TodoRepositoryInterface, Todo } from "../src/index.js";

export class FakeRepository implements TodoRepositoryInterface {
    async listTodos(): Promise<Todo[]> {
        return [] as Todo[];
    }
    createTodo(todo: Todo): Todo {
        return todo;
    }
}