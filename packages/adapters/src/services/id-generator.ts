import { randomUUID } from "crypto";
import { Identifier, IdGeneratorInterface } from "todo-domain";

export class UUIDGenerator implements IdGeneratorInterface {
	public generate() {
		return Identifier.create(randomUUID());
	}
}