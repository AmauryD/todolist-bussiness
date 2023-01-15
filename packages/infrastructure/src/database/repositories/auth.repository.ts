import { EntityRepository, MikroORM } from "@mikro-orm/core";
import { container } from "@triptyk/nfw-core";
import { randomUUID } from "crypto";
import { AuthRepositoryInterface, User } from "todo-domain";
import { RefreshTokenModel } from "../models/refresh-token.js";
import { UserModel } from "../models/user.js";

export class SQLAuthRepository implements AuthRepositoryInterface {
	private ormRefreshRepository: EntityRepository<RefreshTokenModel>;
	private ormUserRepository: EntityRepository<UserModel>;

	public constructor() {
		this.ormRefreshRepository = container.resolve(MikroORM).em.getRepository<RefreshTokenModel>("RefreshToken");
		this.ormUserRepository = container.resolve(MikroORM).em.getRepository<UserModel>("User");
	}

	public async generateRefreshTokenForUser(user: User) {
		const randomToken = randomUUID();
		const userModel =  await this.ormUserRepository.findOne({ id: user.id.value });

		if (!userModel) {
			return "";
		}

		const refreshTokenModel = this.ormRefreshRepository.create({
			token: randomToken,
			user: userModel
		});

		await this.ormRefreshRepository.persistAndFlush(refreshTokenModel);

		return randomToken;
	}
}