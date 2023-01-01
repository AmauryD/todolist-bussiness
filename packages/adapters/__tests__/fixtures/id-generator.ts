import { Identifier } from "todo-domain/domain/shared/value-objects/identifier.js";
import { IdGeneratorInterface } from "todo-domain/index.js";

export class DummyIdGenerator implements IdGeneratorInterface {
	public generate() {
		return Identifier.create("1");
	}
}