import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { TodoListModel } from "../models/todo-list.js";
import { UserModel } from "../models/user.js";

export class TodoListSeeder extends Seeder {
	public async run(em: EntityManager): Promise<void> {
		const user = em.getRepository<UserModel>("User").create({
			id: "123",
			username: "amaury",
			email: "amaury@gmail.com",
			isValidated: true
		});
		const firstTodoList = em.getRepository<TodoListModel>("TodoList").create({
			title: "bonjour",
			id: "123",
			owner: user
		});

		await em.persistAndFlush(firstTodoList);
	}
}
    