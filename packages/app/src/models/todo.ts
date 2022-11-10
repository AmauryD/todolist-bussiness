import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class TodoModel {
    @Property()
    declare id: string;

    @Property()
    declare title: string;

    @Property()
    declare done: boolean;
}