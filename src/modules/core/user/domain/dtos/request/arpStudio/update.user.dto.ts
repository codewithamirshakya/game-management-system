
enum StateType {
    'zero' = 0 ,
    'Minus one'= -1,
    'Minus two' = -2
}

export class UpdateUserDto {

    readonly username: string;

    readonly nickname: string;

    readonly state: StateType;

    readonly currenttime: number;
}
