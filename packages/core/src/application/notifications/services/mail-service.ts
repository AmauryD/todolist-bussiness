import { Result } from "true-myth";

export interface MailMessage {
    to: string;
    from: string;
    content: string;
    subject: string;
}

export interface MailServiceInterface {
    send(message: MailMessage): Promise<Result<unknown, Error>>;
}