import { SerializerInterface } from "adapters/interfaces/serializer.interface.js";

export class TodoListsRESTSerializer implements SerializerInterface {
	public constructor(
		private entityName: string
	) {}

	public serialize(something: unknown): unknown {
		return {
			[this.entityName]: something
		};
	}
}