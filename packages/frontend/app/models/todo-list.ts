import Model, { attr } from '@ember-data/model';

export default class TodoListModel extends Model {
  @attr('string') declare name: string;
  @attr('boolean') declare isDone: boolean;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'todo-list': TodoListModel;
  }
}
