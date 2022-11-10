import { Request, Response } from "express";
import { TodoController } from "adapters";
import { Body, Controller, GET, POST } from "@triptyk/nfw-http";
import { inject } from "tsyringe";
import { Todo } from "todo-domain";

@Controller({
    routeName: '/todos'
})
export class WebTodoController {
    constructor(
        @inject(TodoController) public controller: TodoController,
    ) {}

    @POST('/')
    public create(@Body() body: unknown) {
        const todo = this.controller.create(body as Todo);
        return todo;
    }
}