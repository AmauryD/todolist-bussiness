import { Controller, Param, POST, UseMiddleware } from "@triptyk/nfw-http";
import { WebAuthController as AuthControllerAdapter } from "adapters";
import { Body } from "../decorators/json-body.js";
import { DefaultErrorHandlerMiddleware } from "../error-handlers/default.js";
@Controller({
	routeName: "/api/v1/auth"
})
@UseMiddleware(DefaultErrorHandlerMiddleware)
export class AuthController {
	public constructor(
        public authControllerAdapter: AuthControllerAdapter
	) {}

	@POST("/register")
	public async register(@Body() registerRequest: any) {
		if (registerRequest.isErr) {
			throw registerRequest.error;
		}
		
		return this.authControllerAdapter.register(registerRequest.value);
	}

	@POST("/login")
	public login(@Body() loginRequest: any) {
		return this.authControllerAdapter.login(loginRequest);
	}

	@POST("/validate-account/:userId/:token")
	public validateAccount(@Param("userId") userId: string, @Param("token") token: string) {
		return this.authControllerAdapter.validateAccount(userId, token);
	}
}