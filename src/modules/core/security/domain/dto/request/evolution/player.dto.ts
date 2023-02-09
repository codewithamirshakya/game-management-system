class Session {
  readonly id: string;
  readonly ip: string;
}
enum GroupAction {
  'assign' = "assign" ,
  'clear'= "clear",
}

class Group {
  readonly id: string;
  readonly action: GroupAction;
}

export class PlayerDto {

  readonly id: string;

  readonly update: boolean;

  readonly firstName: string;

  readonly lastName: string;

  readonly nickname: string;

  readonly country: string;

  readonly language: string;

  readonly currency: string;

  readonly session: Session;

  readonly group: Group;
}

