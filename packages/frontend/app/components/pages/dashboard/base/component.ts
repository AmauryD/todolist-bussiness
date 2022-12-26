import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service.js';
import Component from '@glimmer/component';
import { service } from '@ember/service';

interface PagesDashboardBaseComponentArgs {}

export default class PagesDashboardBaseComponent extends Component<PagesDashboardBaseComponentArgs> {
  @service declare router: RouterService;

  @action
  createTodoList() {
    this.router.transitionTo('dashboard.create');
  }
}
