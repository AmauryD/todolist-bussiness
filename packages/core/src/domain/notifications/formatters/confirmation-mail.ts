export interface ConfirmationMailData {
    username: string;
    token: string;
}

export interface ConfirmationMailFormatterInterface {
    format(data: ConfirmationMailData): string;
}