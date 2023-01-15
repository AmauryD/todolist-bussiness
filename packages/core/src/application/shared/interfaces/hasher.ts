export interface PasswordHashServiceInterface {
    hash(password: string): Promise<string> | string;
}