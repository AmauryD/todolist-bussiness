import Model, { attr } from '@ember-data/model';

export default class TodoListModel extends Model {
  @attr('string') declare name: string;
  @attr('boolean') declare isDone: boolean;
}
