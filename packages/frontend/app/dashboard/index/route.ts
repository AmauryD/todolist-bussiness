import type emberData__store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardIndexRoute extends Route {
  @service declare store: emberData__store;

  public async model() {
    const todoLists = await this.store.query('todo-list', {});
    return {
      todoLists,
    };
  }
}
