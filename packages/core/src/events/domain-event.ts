export interface DomainEventInterface<T> {
    entity: Readonly<T>;
    date: Date;
    getId(): string;
}