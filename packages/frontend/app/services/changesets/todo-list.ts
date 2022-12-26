import Service, { service } from '@ember/service';
import lookupValidator from 'ember-changeset-validations';
import type { TodoListChangesetDTO } from 'ember-boilerplate/changesets/todo-list';
import { TodoListChangeset } from 'ember-boilerplate/changesets/todo-list';
import type emberData__store from '@ember-data/store';
import type TodoListModel from '../../models/todo-list.js';
import type Result from 'true-myth/result';
import { err, ok } from 'true-myth/result';

export default class ChangesetsTodoListService extends Service {
  @service declare store: emberData__store;

  emptyChangeset() {
    return new TodoListChangeset({}, lookupValidator({}), {});
  }

  async saveChangeset(
    changeset: TodoListChangeset
  ): Promise<Result<TodoListModel, Error>> {
    if (changeset.isInvalid) {
      return err(new Error('Changeset should be valid'));
    }
    changeset.execute();
    const data = changeset.data as TodoListChangesetDTO;

    try {
      const record = this.store.createRecord('todo-list', {
        name: data.name,
      });
      await record.save();
      return ok(record);
    } catch (e) {
      if (e instanceof Error) {
        return err(e);
      }
      return err(new Error(e as never));
    }
  }
}
