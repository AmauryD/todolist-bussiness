import { Todo } from "../interfaces/entities/todo.js";
import { TodoReadRepositoryInterface } from "../interfaces/repositories/todo-read.js";
import { ListTodoUseCaseInterface } from "../interfaces/use-case/list-todo.js";

export class ListTodoUseCase implements ListTodoUseCaseInterface {
    constructor(
        public todoRepository : TodoReadRepositoryInterface
    ) {

    }

    execute(): Promise<Todo[]> {
        return this.todoRepository.listTodos();
    }
}