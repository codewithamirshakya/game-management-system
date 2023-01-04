import * as moment from "moment";

export class CreateUserDto{

    constructor(username: string , gameProvider : number) {
        this.username = username;
        this.gameProvider = gameProvider;
        this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    username: string;

    gameProvider: number;

    createdAt: string;

    updatedAt: string;

    ipAddress: string;

}
