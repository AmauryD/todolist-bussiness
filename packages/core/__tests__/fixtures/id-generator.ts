import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";
import { IdGeneratorInterface } from "../../src/index.js";

export class FakeIdGenerator implements IdGeneratorInterface {
	public generate() {
		return Identifier.create("1");
	}
}