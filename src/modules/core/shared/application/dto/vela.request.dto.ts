export class VelaRequestDto {
  constructor(obj) {
    Object.assign(this,obj);
  }
  public endpoint : string;
  public params : any;
  public method : string;
  public baseUrl?: string;
}