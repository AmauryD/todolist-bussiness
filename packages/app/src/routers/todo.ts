import { TodoController, TodoRepository } from "adapters";
import { CreateTodoUseCase } from "todo-domain";
import { Router } from "express";

import { createTodo } from "../controller/todo";

const router = Router();

const controller = new TodoController(
       new CreateTodoUseCase(
            new TodoRepository()
       )
);

router.get('/', createTodo(controller));