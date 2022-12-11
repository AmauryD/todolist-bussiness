import { SerializerInterface } from "adapters/interfaces/serializer.interface.js";
import JSONAPISerializer from "json-api-serializer";

export class TodoListsJsonApiSerializer implements SerializerInterface {
	private serializer = new JSONAPISerializer();

	public constructor() {
		this.serializer.register("todo-lists", {
			whitelist: []
		});
	}

	public serialize(something: unknown): unknown {
		return this.serializer.serialize("todo-lists", something);
	}
}