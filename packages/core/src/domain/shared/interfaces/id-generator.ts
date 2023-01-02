import { Identifier } from "../value-objects/identifier.js";

export interface IdGeneratorInterface {
    generate(): Identifier;
}