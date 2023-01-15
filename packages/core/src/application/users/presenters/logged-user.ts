import { PresenterInterface } from "../../index.js";
import { LoginUseCaseOutput } from "../use-cases/login/response.js";

export type LoggedUserPresenterInterface = PresenterInterface<LoginUseCaseOutput, unknown>;