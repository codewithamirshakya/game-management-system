import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LogoutArpStudioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly appid: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @ApiPropertyOptional()
  readonly currenttime: number;
}