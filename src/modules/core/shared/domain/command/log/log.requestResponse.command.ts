export class LogRequestResponseCommand {
  constructor(
    public readonly requestData : any,
    public readonly url : string,
    public readonly response: any,
  ) {
  }
}