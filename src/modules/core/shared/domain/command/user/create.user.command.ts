import { CreateARPUserInterface } from "../interface/create.user.interface";

export class CreateUserCommand {
  constructor(
    public readonly userData : (CreateARPUserInterface),
    public readonly gameProvider: number,
  ) {
  }
}