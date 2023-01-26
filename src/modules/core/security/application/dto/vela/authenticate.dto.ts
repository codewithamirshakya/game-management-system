import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthenticateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly access_token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly game_code: string;
}