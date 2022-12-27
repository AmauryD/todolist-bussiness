
export interface TodoListAuthorizerInterface {
    canUserAccessTodoList(userId: string, todoListId: string): boolean | Promise<boolean>;
}