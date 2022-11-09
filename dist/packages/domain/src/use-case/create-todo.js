export class CreateTodoUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    execute(todo) {
        return this.repository.createTodo(todo);
    }
}
