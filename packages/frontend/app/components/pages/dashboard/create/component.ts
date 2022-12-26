import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { TodoListChangeset } from 'ember-boilerplate/changesets/todo-list';
import type ChangesetsTodoListService from 'ember-boilerplate/services/changesets/todo-list';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

export default class PagesDashboardCreateComponent extends Component {
  @service('changesets/todo-list')
  declare changesetsTodoList: ChangesetsTodoListService;
  @service declare flashMessages: FlashMessageService;
  public changeset: TodoListChangeset;

  public constructor(owner: unknown, args: {}) {
    super(owner, args);
    this.changeset = this.changesetsTodoList.emptyChangeset();
  }

  @action
  async createTodoList(changeset: TodoListChangeset) {
    const saved = await this.changesetsTodoList.saveChangeset(changeset);
    if (saved.isOk) {
      return this.flashMessages.success('Success !');
    }
    this.flashMessages.danger('Danger');
  }
}
