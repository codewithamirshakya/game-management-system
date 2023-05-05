enum MethodEnum {
  'POST' = 'POST',
  'GET' = 'GET'
}
export class EvolutionRequestDto {
  constructor(obj) {
    Object.assign(this,obj);
  }
  public endpoint : string;
  public params : any;
  public method : MethodEnum;
  public baseUrl?: string;
  public headers?: object;
}