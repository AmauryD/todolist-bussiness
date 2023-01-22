import { EntityRepository, MikroORM, wrap } from "@mikro-orm/core";
import { container } from "@triptyk/nfw-core";
import { TodoListAggregateRoot, TodoListRepositoryInterface } from "todo-domain";
import { Maybe } from "true-myth";
import { nothing } from "true-myth/maybe";
import Result, { Err, ok } from "true-myth/result";
import { toMaybe } from "true-myth/toolbelt";
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
	public async findTodoListById(todoListId: string): Promise<Maybe<TodoListAggregateRoot>> {
		const todoList = await this.ormRepository.findOne(todoListId);

		if (todoList === null) {
			return nothing();
		}

		return toMaybe(this.mapper.toDomain(todoList));
	}
	
	public async update(todoList: TodoListAggregateRoot): Promise<void> {
		const toPersist = this.mapper.toPersistence(todoList);

		if (toPersist.isErr) {
			throw toPersist.error;
		}

		const todoORM = await this.ormRepository.findOneOrFail({ id: todoList.id.value });

		const updated = wrap(todoORM).assign(toPersist.value);

		this.ormRepository.persist(updated);
	}

	public async create(aggregateRoot: TodoListAggregateRoot) {
		const toPersist = this.mapper.toPersistence(aggregateRoot);

		if (toPersist.isErr) {
			return toPersist as Err<never, Error>;
		}

		const todoORM = this.ormRepository.create(toPersist.value);

		await this.ormRepository.persistAndFlush(todoORM);

		return ok<void, never>(undefined);
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