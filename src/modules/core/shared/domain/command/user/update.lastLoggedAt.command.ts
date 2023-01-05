export class UpdateLastLoggedAtCommand {
  constructor(
    public readonly username: string,
    public readonly gameProvider: number,
  ) {
  }
}