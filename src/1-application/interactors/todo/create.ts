
import { Todo } from "../../../0-enterprise/entities/todo";
import { InteractorInterface } from "../../interface";
import { TodoRepositoryInterface } from "../../ports/todo/repository";

export interface CreateTodoDS {
    id: string;
    title: string;
    todoListId: string;
    status: boolean;
}

export class CreateTodo implements InteractorInterface {
    constructor(
        public repository: TodoRepositoryInterface
    ) {}

    execute(createTodoDS : CreateTodoDS): Todo {
        return this.repository.create(createTodoDS);
    }
}