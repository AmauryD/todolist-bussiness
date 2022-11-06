import { Todo } from "../../src/0-enterprise/todo";
import { CreateTodo, CreateTodoDS } from "../../src/1-application/interactors/todo/create";
import { TodoRepositoryInterface } from "../../src/1-application/ports/todo/repository";

describe("TODO", () => {
    it("Creates a todo",  ()=>{
        class TodoPort implements TodoRepositoryInterface {
            create(todo: CreateTodoDS): Todo {
                throw new Error("Method not implemented.");
            }
        }

        const useCase = new CreateTodo(
            new TodoPort()
        );

        expect(useCase.execute({
            id: '',
            title: '',
            todoListId: '',
            status: false
        })).toBeInstanceOf(Todo);
    });
})