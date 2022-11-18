import { Todo } from "../interfaces/entities/todo.js";
import { TodoRepositoryInterface } from "../interfaces/repository/todo.js";
import { ListTodoUseCaseInterface } from "../interfaces/use-case/list-todo.js";

export class ListTodoUseCase implements ListTodoUseCaseInterface {
    constructor(
        public todoRepository : TodoRepositoryInterface
    ) {

    }

    execute(): Promise<Todo[]> {
        return this.todoRepository.listTodos();
    }
}