import "reflect-metadata";
import Koa from "koa";
import { createApplication } from "@triptyk/nfw-http";
import {init, requestContext} from "@triptyk/nfw-mikro-orm";
import { TodoModel } from "./models/todo.js";
import { WebTodoController } from "./controller/todo.js";
import { container } from "tsyringe";
import { TodoController, TodoRepository } from "adapters";
import { CreateTodoUseCase, ListTodoUseCase } from "todo-domain";
import { TodoDataSource } from "./datasource/todo.js";
import {koaBody} from "koa-body";

async function bootstrap() {
    const server = new Koa();

    await setupDatabase();

    registerInstancesToContainer();

    server.use(requestContext);
    server.use(koaBody());

    await createApplication({
        server,
        controllers: [WebTodoController]
    });

    server.listen(8000, () => {
        console.log("listening http://localhost:8000");
    });
}

async function setupDatabase() {
    const orm = await init({
        type: 'sqlite',
        entities: [TodoModel],
        dbName: ':memory:'
    });
    await orm.getSchemaGenerator().ensureDatabase();
    await orm.getSchemaGenerator().updateSchema();
}

function registerInstancesToContainer() {
    const repository =  new TodoRepository(
        container.resolve(TodoDataSource)
    );

    const todoController = new TodoController(
        new CreateTodoUseCase(
            repository
        ),
        new ListTodoUseCase(
            repository
        )
    );

    container.registerInstance(TodoController, todoController);
}


bootstrap();