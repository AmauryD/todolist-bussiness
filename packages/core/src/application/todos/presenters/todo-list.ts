import { TodoListAggregateRoot } from "../../../index.js";
import { PresenterInterface } from "../../shared/interfaces/presenter.js";

export type TodoListPresenterInterface = PresenterInterface<TodoListAggregateRoot, unknown>;