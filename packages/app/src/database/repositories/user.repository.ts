import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { Identifier, User, UserPropertiesWithoutPassword, UserRepositoryInterface } from "todo-domain";
import { Result } from "true-myth";
import Maybe, { just, nothing } from "true-myth/maybe";
import { ok } from "true-myth/result";
import { container } from "tsyringe";
import { UserModel } from "../models/user.js";

export class SQLUserRepository implements UserRepositoryInterface {
	private ormRepository: EntityRepository<UserModel>;

	public constructor() {
		this.ormRepository = container.resolve(MikroORM).em.getRepository<UserModel>("User");
	}

	public async getUserByEmail(mail: string): Promise<Maybe<User>> {
		const user = await this.ormRepository.findOne({
			email: mail
		});
        
		if (user === null) {
			return nothing();
		}

		return just(User.create({
			password: just(user.password),
			username: user.username,
			email: user.email,
			id: Identifier.create(user.id)
		}));
	}

	public async createWithoutPassword(params: UserPropertiesWithoutPassword): Promise<Result<User, Error>> {
		const user = User.create({ ...params, password: nothing() });

		const userORM = this.ormRepository.create({
			username: user.username,
			id: user.id.value,
			email: user.email,
			password: undefined
		});

		await this.ormRepository.persistAndFlush(userORM);

		return ok(user);
	}
}