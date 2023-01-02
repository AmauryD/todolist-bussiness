import { UseCaseInterface } from "../../shared/interfaces/use-case.js";
import { ConfirmationMailFormatter } from "../formatters/confirmation-mail.js";
import { MailServiceInterface } from "../services/mail-service.js";


export interface SendConfirmationMailParams {
    username: string,
    email: string,
    token: string
}

export class SendConfirmationMailUseCase implements UseCaseInterface {
	public constructor(
        private mailService: MailServiceInterface,
        private confirmationMailFormatter: ConfirmationMailFormatter
	) {}

	public async execute(params: SendConfirmationMailParams) {
		await this.mailService.send({
			subject: "New account",
			to: params.email,
			from: "TodoList App",
			content: this.confirmationMailFormatter.format({})
		});
	}
}