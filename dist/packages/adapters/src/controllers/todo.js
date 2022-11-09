export class TodoController {
    createTodo;
    constructor(createTodo) {
        this.createTodo = createTodo;
    }
    create(todo) {
        return this.createTodo.execute(todo);
    }
}
