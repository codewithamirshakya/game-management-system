import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class AuthenticateDto extends DataTransferObject{
  readonly access_token: string;
  readonly game_code: string;
}