import Result from "true-myth/result";

export interface DataMapper<D, P> {
    toPersistence(domainEntity: D): Result<P, Error>,
    toDomain(ORMEntity: P): Result<D, Error>,
}