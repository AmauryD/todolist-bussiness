import { AbstractSendConfirmationMailListener, SendConfirmationMailUseCase, UserCreatedEvent } from "todo-domain";

/**
 * You should see the listener as a sort of controller ?
 */
export class ConfirmationMailListener extends AbstractSendConfirmationMailListener {
	public constructor(
        private sendConfirmationMailUseCase: SendConfirmationMailUseCase
	) {
		super();
	}

	protected async handle(e: UserCreatedEvent): Promise<void> {
		await this.sendConfirmationMailUseCase.execute({
			username: e.entity.username,
			email: e.entity.email,
			userId: e.entity.id,
			token: e.entity.validationToken ?? ""
		});
	}
}