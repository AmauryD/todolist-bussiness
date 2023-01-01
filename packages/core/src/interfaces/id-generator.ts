import { Result } from "true-myth";
import { Identifier } from "../domain/shared/value-objects/identifier.js";

export interface IdGeneratorInterface {
    generate(): Result<Identifier, Error>;
}