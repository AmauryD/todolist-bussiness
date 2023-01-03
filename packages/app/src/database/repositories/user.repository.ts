import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { DomainEvents, Identifier, User, UserPropertiesWithoutPassword, UserRepositoryInterface } from "todo-domain";
import { ValidationToken } from "todo-domain";
import { Result } from "true-myth";
import Maybe, { just, nothing } from "true-myth/maybe";
import { ok } from "true-myth/result";
import { toMaybe } from "true-myth/toolbelt";
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

		const validationToken = ValidationToken.from(user.validationToken ?? "");

		return just(User.create({
			password: Maybe.of(user.password),
			validationToken: toMaybe(validationToken),
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
			password: undefined,
			validationToken: user.validationToken.mapOr(undefined, (vt) => vt.value)
		});
		
		DomainEvents.markForDispatch(user);

		await this.ormRepository.persistAndFlush(userORM);

		return ok(user);
	}
}