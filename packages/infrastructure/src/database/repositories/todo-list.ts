import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { container } from "@triptyk/nfw-core";
import { TodoListAggregateRoot, TodoListProperties, TodoListRepositoryInterface } from "todo-domain";
import Result, { ok } from "true-myth/result";
import { TodoListMapper } from "../mappers/todo-list.js";
import { TodoListModel } from "../models/todo-list.js";
import { UserModel } from "../models/user.js";

/**
 * Petit raccourci que j'ai pris, normalement il aurait fallu le faire en deux temps via la couche adapters.
 * ça ne brise pas la clean architecture. 
 * Petite explication ici http://www.plainionist.net/Implementing-Clean-Architecture-Frameworks/
 */
export class SQLTodoListRepository implements TodoListRepositoryInterface {
	private ormRepository: EntityRepository<TodoListModel>;
	private userRepository: EntityRepository<UserModel>;

	private mapper = new TodoListMapper();

	public constructor() {
		this.ormRepository = container.resolve(MikroORM).em.getRepository<TodoListModel>("TodoList");
		this.userRepository = container.resolve(MikroORM).em.getRepository<UserModel>("User");
	}

	public async create(structure: TodoListProperties) {
		const todo = TodoListAggregateRoot.create(structure);

		if (todo.isErr) {
			return todo;
		}

		const todoORM = this.ormRepository.create({
			title: todo.value.name,
			id: todo.value.id.value,
			owner: await this.userRepository.findOneOrFail(structure.ownerId.value)
		});

		await this.ormRepository.persistAndFlush(todoORM);

		return todo;
	}
	
	public async listForUser() {
		const todos = await this.ormRepository.findAll({
			populate:  ["owner"]
		});
		const todoList : TodoListAggregateRoot[] = [];

		for (const todo of todos) {
			const created = this.mapper.toDomain(todo);
			if (created.isErr) {
				return created as Result<never, Error>;
			}
			todoList.push(created.value);
		}

		return ok<TodoListAggregateRoot[], never>(todoList);
	}
}