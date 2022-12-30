export interface HashServiceInterface {
    hash(password: string, salt: string): Promise<string>;
}