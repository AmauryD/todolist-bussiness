export class Todo {
    #id: string;
    #title: string;
    #isDone: boolean;
    #date: Date;

    get id() {
        return this.#id;
    }

    get date() {
        return this.#date;
    }

    get title() {
        return this.#title;
    }

    get isDone() {
        return this.#isDone;
    }

    public constructor(
        id: string,
        title: string,
        isDone: boolean,
    ) {
        this.#id = id;
        this.#title = title;
        this.#isDone = isDone;
    }

    public changeDate(date: Date) {
        this.#date = date;
    }
}