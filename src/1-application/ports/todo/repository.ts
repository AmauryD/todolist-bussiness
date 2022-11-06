
import { Todo } from "../../../0-enterprise/entities/todo";
import { CreateTodoDS } from "../../interactors/todo/create";

export interface TodoRepositoryInterface {
    create(todo: CreateTodoDS) : Todo;
}