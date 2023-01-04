import * as moment from "moment";

export class CreateUserDto{

    constructor(data) {
        Object.assign(this,data);
        this.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    user_id: number;

    username: string;

    nickname: string;

    createdAt: string;

    updatedAt: string;

}
