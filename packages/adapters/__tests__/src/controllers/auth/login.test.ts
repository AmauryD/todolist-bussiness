import assert from "node:assert";
import { it } from "node:test";
import { UseCaseInterface } from "todo-domain/application/shared/interfaces/use-case.js";
import { WebError, LoginWebController } from "../../../../src/index.js";

class FailingUseCaseMock implements UseCaseInterface {
	public async execute(): Promise<unknown> {
		return new WebError(500, new Error());
	}
}

class SuccessUseCaseMock implements UseCaseInterface {
	public async execute(): Promise<unknown> {
		return {
			success: true
		};
	}
}


it("Throws an error when use-case returns a WebError", async () => {
	const loginUseCase = new FailingUseCaseMock();
	const loginController = new LoginWebController(
		loginUseCase as never
	);
	await assert.rejects(() => loginController.login({
		password: "",
		email: ""
	}));
});

it("Returns use-case result when result is not an error", async () => {
	const loginUseCase = new SuccessUseCaseMock();
	const loginController = new LoginWebController(
		loginUseCase as never
	);
	const loginResult = await loginController.login({
		password: "",
		email: ""
	});
	assert.deepStrictEqual(loginResult, {
		success : true
	});
});
