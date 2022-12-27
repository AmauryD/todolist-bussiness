import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service.js';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { TodoListChangeset } from 'ember-boilerplate/changesets/todo-list';
import type ChangesetsTodoListService from 'ember-boilerplate/services/changesets/todo-list';
import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

export default class PagesDashboardCreateComponent extends Component {
  @service('changesets/todo-list')
  declare changesetsTodoList: ChangesetsTodoListService;
  @service declare flashMessages: FlashMessageService;
  @service declare router: RouterService;
  public changeset: TodoListChangeset;

  public constructor(owner: unknown, args: {}) {
    super(owner, args);
    this.changeset = this.changesetsTodoList.emptyChangeset();
  }

  @action
  async createTodoList(changeset: TodoListChangeset) {
    const saved = await this.changesetsTodoList.saveChangeset(changeset);
    if (saved.isOk) {
      this.flashMessages.success('Success !');
      return this.router.transitionTo('dashboard.index');
    }

    this.flashMessages.danger(saved.error.message);
  }
}
