import { randomUUID } from "crypto";
import { IdGeneratorInterface } from "todo-domain/index.js";

export class UUIDGenerator implements IdGeneratorInterface {
	public generate(): string {
		return randomUUID();
	}
}