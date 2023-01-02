export interface ConfirmationMailData {

}

export interface ConfirmationMailFormatter {
    format(data: ConfirmationMailData): string
}