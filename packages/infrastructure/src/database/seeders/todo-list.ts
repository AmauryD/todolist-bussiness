import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { TodoListModel } from "../models/todo-list.js";

export class TodoListSeeder extends Seeder {
	public async run(em: EntityManager): Promise<void> {
		const firstTodoList = em.getRepository<TodoListModel>("TodoList").create({
			title: "bonjour",
			id: "123"
		});
		await em.persistAndFlush(firstTodoList);
	}
}
    