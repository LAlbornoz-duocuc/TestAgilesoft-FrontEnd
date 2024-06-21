export class User{
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;


    constructor(){
        this.id = 0;
        this.username = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.createdAt = new Date;
    }
}