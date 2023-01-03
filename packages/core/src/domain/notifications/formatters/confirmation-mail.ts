export interface ConfirmationMailData {
    username: string;
    userId: string;
    token: string;
}

export interface ConfirmationMailFormatterInterface {
    format(data: ConfirmationMailData): string;
}