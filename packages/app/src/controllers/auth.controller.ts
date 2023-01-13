import { Controller, Param, POST, UseMiddleware } from "@triptyk/nfw-http";
import { LoginWebController, RegisterWebController, ValidateAccountWebController } from "adapters";
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
	public login(@Body() loginRequest: any) {
		return this.loginControllerAdapter.login(loginRequest);
	}

	@POST("/validate-account/:userId/:token")
	public validateAccount(@Param("userId") userId: string, @Param("token") token: string) {
		return this.validateControllerAdapter.validateAccount(userId, token);
	}
}