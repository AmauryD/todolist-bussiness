import { Identifier } from "../domain/shared/value-objects/identifier.js";

export interface IdGeneratorInterface {
    generate(): Identifier;
}