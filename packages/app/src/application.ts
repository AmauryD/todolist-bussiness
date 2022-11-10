import "reflect-metadata";
import Koa from "koa";
import { createApplication } from "@triptyk/nfw-http";
import {init} from "@triptyk/nfw-mikro-orm";

export async function bootstrap() {
    const express = new Koa();

    await init({
        type: 'sqlite',
        dbName: ':memory:'
    });

    await createApplication({
        server: new Koa(),
        controllers: []
    });

    express.listen(() => {
        console.log("listening");
    });
}

bootstrap();