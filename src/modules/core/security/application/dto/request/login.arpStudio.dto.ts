import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginArpStudioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly appid: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nickname: string;
  readonly state: number;

  @ApiProperty()
  @IsOptional()
  readonly language: number; // ['en' => 2,'th' => 5,'cn' => 1]
  readonly portrait: string;
  readonly currency: string;
  readonly returnUrl: string;
  readonly currentTime: number;
  readonly piexl: number;
  readonly gameid: number;
}