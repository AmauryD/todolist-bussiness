export interface SnapshotAbleInterace<T extends object> {
    snapshot(): T;
}