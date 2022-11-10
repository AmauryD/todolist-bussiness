import { Todo } from "todo-domain";

export interface TodoDataSourceInterface {
    createOne(contactData: Todo) : Todo | Promise<Todo>;
}