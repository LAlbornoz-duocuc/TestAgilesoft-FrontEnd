export class Payload{
    type: string;
    token: string;
    refresh_token: string;

    constructor(){
        this.type = "";
        this.token = "";
        this.refresh_token = "";
    }
}