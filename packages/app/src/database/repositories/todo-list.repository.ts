import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { container } from "@triptyk/nfw-core";
import { Identifier, TodoListAggregateRoot, TodoListProperties, TodoListRepositoryInterface } from "todo-domain";
import Result, { err, ok } from "true-myth/result";
import { TodoList } from "../models/todo-list.js";

/**
 * Petit raccourci que j'ai pris, normalement il aurait fallu le faire en deux temps via la couche adapters.
 * ça ne brise pas la clean architecture. 
 * Petite explication ici http://www.plainionist.net/Implementing-Clean-Architecture-Frameworks/
 */
export class SQLTodoListRepository implements TodoListRepositoryInterface {
	private ormRepository: EntityRepository<TodoList>;

	public constructor() {
		this.ormRepository = container.resolve(MikroORM).em.getRepository<TodoList>("TodoList");
	}

	public async create(structure: TodoListProperties) {
		const todo = TodoListAggregateRoot.create(structure);

		if (todo.isErr) {
			return err<never, Error>(todo.error);
		}

		const todoORM = this.ormRepository.create({
			title: todo.value.name,
			id: todo.value.id.value
		});

		await this.ormRepository.persistAndFlush(todoORM);

		return todo;
	}
	
	public async list() {
		const todos = await this.ormRepository.findAll();
		const todoList : TodoListAggregateRoot[] = [];

		for (const todo of todos) {
			const created = TodoListAggregateRoot.create({
				name: todo.title,
				id: Identifier.create(todo.id)
			});

			if (created.isErr) {
				return created as Result<never, Error>;
			}
			todoList.push(created.value);
		}

		return ok<TodoListAggregateRoot[], never>(todoList);
	}
}