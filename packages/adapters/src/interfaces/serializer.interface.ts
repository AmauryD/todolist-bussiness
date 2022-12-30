/**
 * This is a presenter
 */
export interface SerializerInterface {
    serialize(something: unknown): unknown;
}