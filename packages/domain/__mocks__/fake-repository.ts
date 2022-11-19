import { TodoRepositoryInterface, Todo } from "../src/index.js";

export class FakeRepository implements TodoRepositoryInterface {
    async getTodo(todoId: string): Promise<Todo> {
        return {
            title: '',
            id: '',
            done: false
        }
    }
    async listTodos(): Promise<Todo[]> {
        return [] as Todo[];
    }
    createTodo(todo: Todo): Todo {
        return todo;
    }
}