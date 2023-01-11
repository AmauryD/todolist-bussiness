import { Maybe } from "true-myth";

export interface EmailValidatorInterface {
    isValid(email: Maybe<string>): boolean;
}