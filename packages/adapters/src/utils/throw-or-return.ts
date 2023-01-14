import { WebError } from "../index.js";

/**
 * The web Framework error handling requires a thrown object as an error
 */
export function throwIfWebErrorOrReturn<T>(result: T) {
	if (result instanceof WebError) {
		throw result;
	}
	return result;
}