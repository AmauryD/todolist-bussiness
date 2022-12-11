import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { container } from "@triptyk/nfw-core";
import { TodoListAggregateRoot, TodoListProperties, TodoListRepositoryInterface } from "todo-domain";
import { TodoList } from "../models/todo-list.js";

export class SQLTodoListRepository implements TodoListRepositoryInterface {
	private ormRepository: EntityRepository<TodoList>;

	public constructor() {
		this.ormRepository = container.resolve(MikroORM).em.getRepository<TodoList>("TodoList");
	}

	public async create(structure: TodoListProperties) {
		const todo = TodoListAggregateRoot.create(structure);
		const todoORM = this.ormRepository.create({
			title: todo.name,
			id: todo.id
		});
		await this.ormRepository.persistAndFlush(todoORM);
		return todo;
	}
	public async list() {
		const todos = await this.ormRepository.findAll();
		return todos.map((t) => TodoListAggregateRoot.create({
			name: t.title,
			id: t.id
		}))
		;
	}
}