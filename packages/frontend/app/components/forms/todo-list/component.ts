import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { TodoListChangeset } from '../../../changesets/todo-list.js';

interface FormsTodoListComponentArgs {
  changeset: TodoListChangeset;
  onSubmit?: (changeset: TodoListChangeset) => {};
}

export default class FormsTodoListComponent extends Component<FormsTodoListComponentArgs> {
  @action
  async submit(e: Event) {
    e.preventDefault();
    await this.args.changeset.validate();
    if (this.args.changeset.isValid) {
      return this.args.onSubmit?.(this.args.changeset);
    }
  }
}
