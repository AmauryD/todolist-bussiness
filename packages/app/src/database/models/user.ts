import { EntitySchema } from "@mikro-orm/core";

export interface UserModel {
    username: string;
    email: string;
    password?: string;
	validationToken?: string;
    id: string;
}

export const userSchema = new EntitySchema<UserModel>({
	name: "User",
	properties: {
		id: { type: "string", primary: true },
		username: { type: "string" },
		email: { type: "string" },
		validationToken: { type: "string", nullable: true },
		password: { type: "string", nullable: true },
	},
});