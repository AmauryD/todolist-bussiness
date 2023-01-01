import { Controller } from "@triptyk/nfw-http";
import { WebAuthController as AuthControllerAdapter } from "adapters";
import { LoginUseCaseRequest, RegisterUseCaseRequest } from "todo-domain";

@Controller({
	routeName: "/api/v1/auth"
})
export class AuthController {
	public constructor(
        public authControllerAdapter: AuthControllerAdapter
	) {}

	public register(registerRequest: RegisterUseCaseRequest) {
		return this.authControllerAdapter.register(registerRequest);
	}

	public login(loginRequest: LoginUseCaseRequest) {
		return this.authControllerAdapter.login(loginRequest);
	}
}