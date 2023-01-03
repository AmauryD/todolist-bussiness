import { Controller, Param, POST, UseMiddleware } from "@triptyk/nfw-http";
import { WebAuthController as AuthControllerAdapter } from "adapters";
import { Result } from "true-myth";
import { Body } from "../decorators/json-body.js";
import { DefaultErrorHandlerMiddleware } from "../error-handlers/default.js";
import { loginSchema, LoginValidationSchemaType } from "../validations/login.js";
import { registerSchema, RegisterValidationSchemaType } from "../validations/register.js";

@Controller({
	routeName: "/api/v1/auth"
})
@UseMiddleware(DefaultErrorHandlerMiddleware)
export class AuthController {
	public constructor(
        public authControllerAdapter: AuthControllerAdapter
	) {}

	@POST("/register")
	public async register(@Body(registerSchema) registerRequest: Result<RegisterValidationSchemaType, Error>) {
		if (registerRequest.isErr) {
			throw registerRequest.error;
		}
		
		const registered = await this.authControllerAdapter.register(registerRequest.value);
		if (registered.isErr) {
			throw registered.error;
		}
		return registered.value;
	}

	@POST("/login")
	public login(@Body(loginSchema) loginRequest: LoginValidationSchemaType) {
		return this.authControllerAdapter.login(loginRequest);
	}

	@POST("/validate-account/:userId/:token")
	public validateAccount(@Param("userId") userId: string, @Param("token") token: string) {
		return this.authControllerAdapter.validateAccount(userId, token);
	}
}