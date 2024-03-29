
import assert from "node:assert";
import { it } from "node:test";
import { Result } from "true-myth";
import { ok } from "true-myth/result";
import { MailServiceInterface } from "../../../../src/application/notifications/services/mail-service.js";
import { ConfirmationMailFormatterInterface, SendConfirmationMailUseCase } from "../../../../src/index.js";

class MailService implements MailServiceInterface {
	public isCalled = false;

	public async send(): Promise<Result<unknown, Error>> {
		this.isCalled = true;
		return ok();
	}
}

class ConfirmationMailFormatter implements ConfirmationMailFormatterInterface {
	public isCalled = false;

	public format(): string {
		this.isCalled = true;
		return "";
	}
}


it("Triggers mail service and formatter", async () => {
	const mailService = new MailService();
	const mailFormater = new ConfirmationMailFormatter();

	const sendConfirmationMailUseCase = new SendConfirmationMailUseCase(
		mailService,
		mailFormater
	);

	await sendConfirmationMailUseCase.execute({
		userId: "a",
		email: "a",
		token: "a",
		username: "a"
	});

	assert.strictEqual(mailService.isCalled, true);
	assert.strictEqual(mailFormater.isCalled, true);
});