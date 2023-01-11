import assert from "node:assert";
import { it } from "node:test";
import { nothing } from "true-myth/maybe";
import { Class } from "type-fest";
import { User } from "../../../../src/domain/users/entities/user.js";
import { UserAccountValidatedEvent } from "../../../../src/domain/users/events/account-validated.js";
import { DomainEventInterface, Identifier, UserCreatedEvent } from "../../../../src/domain/index.js";

function createUser() {
	return User.create({
		username: "amaury",
		email: "amaury@gmail.com",
		validationToken: nothing(),
		isValidated: false,
		id: Identifier.create("1"),
		password: nothing()
	});
}

function assertDomainEventTypeInUser(user: User, eventType: Class<DomainEventInterface>, index: number) {
	assert.strictEqual(user.domainEvents[index].constructor, eventType);
	assert.strictEqual(user.domainEvents[index].getId(), "1");
}

it("Adds a UserCreatedEvent to entity when a User is created", () => {
	const user = createUser();
	assert.strictEqual(user.domainEvents.length, 1);
	assertDomainEventTypeInUser(user, UserCreatedEvent ,0);
});

it("Adds an UserAccountValidatedEvent when User account is valided", () => {
	const user = createUser();
	assert.strictEqual(user.isValidated, false);
	user.validateAccount();
	assert.strictEqual(user.isValidated, true);
	assert.strictEqual(user.domainEvents.length, 2);
	assertDomainEventTypeInUser(user, UserAccountValidatedEvent , 1);
});
