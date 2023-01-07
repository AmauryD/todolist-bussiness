export interface PresenterInterface<T = unknown> {
    present(data: T): Promise<unknown>;
}