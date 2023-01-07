import { TodoListAggregateRoot, TodoListPresenterInterface } from "todo-domain";

export class TodoListWebPresenter implements TodoListPresenterInterface  {
	public present(data: TodoListAggregateRoot) {
		return {
			todoList : data.snapshot()
		};
	}  
}