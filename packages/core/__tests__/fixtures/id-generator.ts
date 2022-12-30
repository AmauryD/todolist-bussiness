import { IdGeneratorInterface } from "../../src/index.js";

export class FakeIdGenerator implements IdGeneratorInterface {
	public generate(): string {
		return "1";
	}
}