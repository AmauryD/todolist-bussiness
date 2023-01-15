import { Identifier } from "../../../index.js";

export interface AuthServiceInterface {
    passwordMatches(password: string, storedPassword: string): Promise<boolean>;
    generateAccessTokenForUser(userId: Identifier): Promise<string>;
}