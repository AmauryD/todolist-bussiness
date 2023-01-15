import { User } from "../../../index.js";

export interface AuthRepositoryInterface {
    generateRefreshTokenForUser(user: User): Promise<string> | string;
}