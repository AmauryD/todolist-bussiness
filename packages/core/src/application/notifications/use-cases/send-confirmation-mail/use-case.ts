import { UseCaseInterface } from "../../../shared/interfaces/use-case.js";
import { ConfirmationMailFormatterInterface } from "../../formatters/confirmation-mail.js";
import { MailServiceInterface } from "../../services/mail-service.js";
import { SendConfirmationMailParams } from "./request.js";

export class SendConfirmationMailUseCase implements UseCaseInterface {
	public constructor(
        private mailService: MailServiceInterface,
        private confirmationMailFormatter: ConfirmationMailFormatterInterface
	) {}

	public async execute(params: SendConfirmationMailParams) {
		const mailContent = this.confirmationMailFormatter.format({
			username: params.username,
			token: params.token,
			userId: params.userId
		});

		await this.mailService.send({
			subject: "New account",
			to: params.email,
			from: "TodoList App",
			content: mailContent
		});
	}
}