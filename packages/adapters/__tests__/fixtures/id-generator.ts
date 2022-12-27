import { IdGeneratorInterface } from "todo-domain/index.js";

export class DummyIdGenerator implements IdGeneratorInterface {
	public generate(): string {
		return "1";
	}
}