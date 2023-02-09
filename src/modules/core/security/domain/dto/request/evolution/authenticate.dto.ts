import { PlayerDto } from "./player.dto";
import { ConfigDto } from "./config.dto";
import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class AuthenticateDto extends DataTransferObject{
  readonly uuid: string;

  readonly player: PlayerDto;

  readonly config: ConfigDto;
}