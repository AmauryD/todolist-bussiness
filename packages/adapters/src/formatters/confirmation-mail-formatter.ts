import { ConfirmationMailData, ConfirmationMailFormatterInterface } from "todo-domain";

export class ConfirmationMailFormatter implements ConfirmationMailFormatterInterface {
	public constructor(
		private appURL: string
	) {}

	public format(data: ConfirmationMailData): string {
		return `Bonjour ${data.username}<br> Voici votre token afin de valider votre compte: ${this.appURL}/${data.userId}/${data.token}`;
	}
} 