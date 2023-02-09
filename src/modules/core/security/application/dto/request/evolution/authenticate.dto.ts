import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PlayerDto } from "./player.dto";
import { ConfigDto } from "./config.dto";

export class AuthenticateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly uuid: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  readonly player: PlayerDto;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  readonly config: ConfigDto;
}