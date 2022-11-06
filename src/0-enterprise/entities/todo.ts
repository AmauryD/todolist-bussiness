export class Todo {
    constructor(
        public id: string,
        public title: string,
        public todoListId : string,
        public done: boolean,
    ) {}
}