import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PlayerDto } from "./player.dto";
import { ConfigDto } from "./config.dto";
import { Type } from "class-transformer";

export class AuthenticateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly uuid: string;

  @Type(() => PlayerDto)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly player: PlayerDto;

  @Type(() => ConfigDto)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly config: ConfigDto;
}