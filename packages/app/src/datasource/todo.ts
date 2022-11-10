import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { injectRepository } from "@triptyk/nfw-mikro-orm";
import { TodoDataSourceInterface } from "adapters";
import { Todo } from "todo-domain";
import { singleton } from "tsyringe";
import { TodoModel } from "../models/todo";

@singleton()
export class TodoDataSource implements TodoDataSourceInterface {
    constructor(
        @injectRepository(TodoModel) public repository: EntityRepository<TodoModel>
    ) {}

    async createOne(todo: Todo): Promise<Todo> {
        const newTodo = this.repository.create({
            title: todo.title,
            done: todo.done,
            id: todo.id
        });
        await this.repository.persistAndFlush(newTodo);
        return {
            title: newTodo.title,
            done: newTodo.done,
            id: newTodo.id
        };
    }
}