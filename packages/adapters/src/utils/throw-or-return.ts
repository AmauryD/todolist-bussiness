import { WebError } from "../index.js";

export function throwIfWebErrorOrReturn<T>(result: T) {
	if (result instanceof WebError) {
		throw result;
	}
	return result;
}