import { IsNotEmpty, IsString } from "class-validator";

export class LoginArpStudioDto {
  @IsString()
  @IsNotEmpty()
  readonly appid: string;
  
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
  readonly state: number;
  readonly language: number; // ['en' => 2,'th' => 5,'cn' => 1]
  readonly portrait: string;
  readonly currency: string;
  readonly returnUrl: string;
  readonly currentTime: number;
  readonly piexl: number;
  readonly gameid: number;
}