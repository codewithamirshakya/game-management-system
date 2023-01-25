export class CreateUserCommand {
  constructor(
    public readonly userData : any,
    public readonly gameProvider: number,
    public readonly ipAddress: string,
  ) {
  }
}