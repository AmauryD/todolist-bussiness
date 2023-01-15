import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { DomainEvents, Identifier, User, UserPropertiesWithoutPassword, UserRepositoryInterface } from "todo-domain";
import { ValidationToken } from "todo-domain";
import { Result } from "true-myth";
import Maybe, { just, Nothing, nothing } from "true-myth/maybe";
import { ok } from "true-myth/result";
import { toMaybe } from "true-myth/toolbelt";
import { container } from "tsyringe";
import { UserModel } from "../models/user.js";

export class SQLUserRepository implements UserRepositoryInterface {
	private ormRepository: EntityRepository<UserModel>;

	public constructor() {
		this.ormRepository = container.resolve(MikroORM).em.getRepository<UserModel>("User");
	}

	public getUserById(userId: Identifier): Promise<Maybe<User>> {
		return this.getUserByProperty("id", userId.value);
	}

	public async validateUserAccount(userId: Identifier, password: string): Promise<Result<Nothing<unknown>, Error>> {
		await this.ormRepository.nativeUpdate({
			id: userId.value
		}, {
			password,
			isValidated: true,
			validationToken: null
		});
		return ok(nothing());
	}

	public async getUserByEmail(mail: string): Promise<Maybe<User>> {
		return this.getUserByProperty("email",mail);
	}

	public async createWithoutPassword(params: UserPropertiesWithoutPassword): Promise<Result<User, Error>> {
		const user = User.create({ ...params, password: nothing() });
		const userORM = this.ormRepository.create({
			username: user.username,
			id: user.id.value,
			isValidated: false,
			email: user.email,
			password: undefined,
			validationToken: user.validationToken.mapOr(undefined, (vt) => vt.value)
		});
		
		DomainEvents.markForDispatch(user);

		await this.ormRepository.persistAndFlush(userORM);

		return ok(user);
	}

	private async getUserByProperty<K extends keyof UserModel>(property: K, value: UserModel[K]): Promise<Maybe<User>>  {
		const user = await this.ormRepository.findOne({
			[property]: value
		});
        
		if (user === null) {
			return nothing();
		}

		const validationToken = ValidationToken.from(user.validationToken ?? "");

		return just(User.create({
			isValidated: user.isValidated,
			password: Maybe.of(user.password),
			validationToken: toMaybe(validationToken),
			username: user.username,
			email: user.email,
			id: Identifier.create(user.id)
		}));
	}
}