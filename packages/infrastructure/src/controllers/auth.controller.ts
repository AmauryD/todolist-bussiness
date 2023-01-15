import { Controller, Param, POST, UseMiddleware } from "@triptyk/nfw-http";
import { LoginWebController, RegisterWebController, ValidateAccountWebController } from "adapters";
import { Maybe, Result } from "true-myth";
import { inject } from "tsyringe";
import { Body } from "../decorators/json-body.js";
import { DefaultErrorHandlerMiddleware } from "../error-handlers/default.js";

@Controller({
	routeName: "/api/v1/auth"
})
@UseMiddleware(DefaultErrorHandlerMiddleware)
export class AuthController {
	public constructor(
		@inject(RegisterWebController) public registerControllerAdapter: RegisterWebController,
		@inject(ValidateAccountWebController) public validateControllerAdapter: ValidateAccountWebController,
		@inject(LoginWebController) public loginControllerAdapter: LoginWebController
	) {}

	@POST("/register")
	public async register(@Body() registerRequest: any) {
		if (registerRequest.isErr) {
			throw registerRequest.error;
		}
		
		return this.registerControllerAdapter.register(registerRequest.value);
	}

	@POST("/login")
	public login(@Body() loginRequest: Result<any, Error>) {
		return this.loginControllerAdapter.login(loginRequest.unwrapOr({}));
	}

	@POST("/validate-account/:userId/:token")
	public validateAccount(@Param("userId") userId: string, @Param("token") token: string, @Body() body: Result<Record<string, string>, Error>) {
		if (body.isErr) {
			throw new Error();
		}
		const newPassword = Maybe.of(body.value.password);
		if (newPassword.isNothing) {
			throw new Error();
		}
		return this.validateControllerAdapter.validateAccount(userId, token, newPassword.value);
	}
}