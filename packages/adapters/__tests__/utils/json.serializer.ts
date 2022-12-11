import { SerializerInterface } from "../../src/interfaces/serializer.interface.js";

export class JsonSerializer implements SerializerInterface {
	public serialize(something: unknown): unknown {
		return JSON.stringify(something);
	}
}