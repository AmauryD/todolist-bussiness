import { Identifier } from "../value-objects/identifier.js";
import { SnapshotAbleInterace } from "./snapshotable.js";

export interface EntityInterface<T extends object> extends SnapshotAbleInterace<T> {
    id: Identifier;
}