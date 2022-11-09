import { Router } from "express";
import { TodoController } from "~/adapters/controllers/todo";
import { TodoRepository } from "~/adapters/repository/todo";
import { CreateTodoUseCase } from "~/domain/use-case/create-todo";
import { createTodo } from "../controller/todo";
const router = Router();
const controller = new TodoController(new CreateTodoUseCase(new TodoRepository()));
router.get('/', createTodo(controller));
