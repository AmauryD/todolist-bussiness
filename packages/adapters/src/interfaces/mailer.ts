export interface MailStructureDTO {
    to:  string;
    from : string;
    subject: string;
    content: string;
}

export interface MailerServiceInterface {
	send(mail: MailStructureDTO): Promise<void> | void;
}