export interface ErrorPresenterInterface<E extends Error, O> {
	present(error: E): O;
}