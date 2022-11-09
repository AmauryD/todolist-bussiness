import { Request, Response } from "express";
import { TodoController } from "adapters";

export const createTodo = (controller: TodoController) => (req: Request, response: Response) => {
    const body = controller.create(req.body);
    response.json(
        body
    );
}