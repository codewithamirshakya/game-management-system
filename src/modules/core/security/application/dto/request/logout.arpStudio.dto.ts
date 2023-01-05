import { IsNotEmpty, IsString } from "class-validator";

export class LogoutArpStudioDto {
  @IsString()
  @IsNotEmpty()
  readonly appid: string;
  
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  readonly currenttime: number;
}