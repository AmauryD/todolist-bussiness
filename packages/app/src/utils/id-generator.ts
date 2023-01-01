import { randomUUID } from "crypto";
import { Identifier, IdGeneratorInterface } from "todo-domain/index.js";

export class UUIDGenerator implements IdGeneratorInterface {
	public generate() {
		return Identifier.create(randomUUID());
	}
}