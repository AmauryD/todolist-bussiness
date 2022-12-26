import { EmberChangeset } from 'ember-changeset';

export interface TodoListChangesetDTO {
  name: string;
}

export class TodoListChangeset extends EmberChangeset {}
