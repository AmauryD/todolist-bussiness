import { TodoController } from "adapters";
import { Body, Controller, GET, Param, POST } from "@triptyk/nfw-http";
import { inject } from "tsyringe";
import { createTodoSchema } from "../validation/create-todo.js";

@Controller({
    routeName: '/todos'
})
export class WebTodoController {
    constructor(
        @inject(TodoController) public controller: TodoController,
    ) {}

    @GET('/:id')
    public  async getOne(@Param('id') id: string) {        
        return this.controller.getOne(id);
    }

    @GET('/')
    public  async list() {        
        return this.controller.list();
    }

    @POST('/')
    public  async create(@Body() body: unknown) {   
        const validate = await createTodoSchema.validate(body);     
        const todo = await this.controller.create(validate);
        return todo;
    }
}