import { EntitySchema, ReferenceType } from "@mikro-orm/core";
import { UserModel } from "./user.js";

export interface RefreshTokenModel {
    user: UserModel,
	token: string
}

export const refreshTokenSchema = new EntitySchema<RefreshTokenModel>({
	name: "RefreshToken",
	properties: {
		token: { type: "string", primary: true },
		user: { reference: ReferenceType.ONE_TO_ONE, entity: "User" },
	},
});