import { Collection, EntitySchema, IdentifiedReference, ReferenceType } from "@mikro-orm/core";
import { RefreshTokenModel } from "./refresh-token.js";
import { TodoListModel } from "./todo-list.js";

export interface UserModel {
    username: string;
    email: string;
    password?: string;
	validationToken?: string;
	isValidated: boolean;
	refreshToken?: IdentifiedReference<RefreshTokenModel>;
	todoLists: Collection<TodoListModel>;
    id: string;
}

export const userSchema = new EntitySchema<UserModel>({
	name: "User",
	properties: {
		id: { type: "string", primary: true },
		username: { type: "string" },
		email: { type: "string" },
		isValidated: { type: "boolean", default: false },
		validationToken: { type: "string", nullable: true },
		refreshToken: { reference: ReferenceType.ONE_TO_ONE, owner: true, entity: "RefreshToken", inversedBy: "user", nullable: true  },
		password: { type: "string", nullable: true },
		todoLists: { reference: ReferenceType.ONE_TO_MANY, entity: "TodoList", mappedBy: "owner" },
	},
});