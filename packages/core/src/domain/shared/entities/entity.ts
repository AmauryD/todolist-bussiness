import { SnapshotAbleInterace } from "./snapshotable.js";

export interface EntityInterface<T extends object> extends SnapshotAbleInterace<T> {
    id: string;
}