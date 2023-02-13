import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class AuthenticateDto extends DataTransferObject{

  readonly authenticateResponse: any;
  readonly uid: string;
  readonly countryCode: string;
}