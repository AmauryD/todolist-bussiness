
import { UserCreatedEvent } from "../../../domain/index.js";
import { EventListener } from "../../../domain/shared/listeners/listener.js";
import { SendConfirmationMailUseCase } from "../use-cases/send-confirmation-mail.js";

export class ConfirmationMailListener extends EventListener<UserCreatedEvent>  {
	protected event = UserCreatedEvent;

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