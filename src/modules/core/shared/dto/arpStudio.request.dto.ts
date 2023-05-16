export class ArpStudioRequestDto {
  constructor(obj) {
    Object.assign(this,obj);
  }
  public endpoint : string;
  public params : any;
  public method : string;
}