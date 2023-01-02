import { IdGeneratorInterface } from "../../src/domain/shared/interfaces/id-generator.js";
import { Identifier } from "../../src/domain/shared/value-objects/identifier.js";


export class FakeIdGenerator implements IdGeneratorInterface {
	public generate() {
		return Identifier.create("1");
	}
}