import { TodoListAggregateRoot, TodoListsPresenterInterface } from "todo-domain";

export class TodoListsWebPresenter implements TodoListsPresenterInterface  {
	public present(data: TodoListAggregateRoot[]) {
		return {
			todoList : data.map((e) => e.snapshot())
		};
	}  
}