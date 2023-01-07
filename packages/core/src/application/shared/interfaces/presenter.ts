export interface PresenterInterface<I,O> {
    present(data: I): O | Promise<O>;
}