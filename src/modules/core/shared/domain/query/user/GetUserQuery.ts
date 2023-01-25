export class GetUserQuery {
  constructor(
    public readonly username: string,
    public readonly gamingProvider: number,
  ) {
  }
}