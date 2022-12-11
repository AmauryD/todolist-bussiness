import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { TodoList } from "../models/todo-list.js";

export class TodoListSeeder extends Seeder {
	public async run(em: EntityManager): Promise<void> {
		const firstTodoList = em.getRepository<TodoList>("TodoList").create({
			title: "bonjour",
			id: "123"
		});
		await em.persistAndFlush(firstTodoList);
	}
}
    