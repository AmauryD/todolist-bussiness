import { writeFile } from "fs/promises";
import { MailMessage, MailServiceInterface } from "todo-domain";
import { ok } from "true-myth/result";

/**
 * No Money MailService, just output the content of the mail to an HTML file, i do not have money to pay a mail provider.
 */
export class IAmBrokeAFMailService implements MailServiceInterface {
	public async send(message: MailMessage) {
		await writeFile(this.mailFileName(message), message.content);
		return ok<never, never>();
	}

	private mailFileName(message: MailMessage) {
		return `mail_${message.to}_${message.subject}.html`;
	}
}