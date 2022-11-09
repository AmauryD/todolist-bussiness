
export class TodoController {
    constructor(
        public createTodo: CreateTodoUseCaseInterface
    ) {}

    public create(todo: CreateTodoRequest) {
        return this.createTodo.execute(todo);
    }
}