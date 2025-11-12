export class Todo {

    public id: number;
    public title: string;
    public completed: boolean

    constructor(
        texto: string
    ) {
        this.id = Math.random();
        this.title = texto;
        this.completed = false;
    }

}