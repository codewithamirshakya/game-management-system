export class IsUserExistsQuery {
  constructor(
    public readonly username: string,
    public readonly gameProvider: number,
  ) {
  }
}