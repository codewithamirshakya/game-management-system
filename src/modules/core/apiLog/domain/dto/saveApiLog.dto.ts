export class SaveApiLogDto {
  constructor(url: string, requestData: string, response: string) {
    this.url = url;
    this.requestData = requestData;
    this.response = response;
  }

  public url: string;
  public requestData: string;
  public response: string;
}