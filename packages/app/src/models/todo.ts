import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class TodoModel {
    @PrimaryKey()
    declare id: string;

    @Property()
    declare title: string;

    @Property()
    declare done: boolean;
}