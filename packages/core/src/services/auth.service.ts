export interface AuthServiceInterface {
    passwordMatches(password: string, storedPassword: string): Promise<boolean>;
}