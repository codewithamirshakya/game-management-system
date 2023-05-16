import { IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GamingProviderEnum, RequestInterface } from "../interface/RequestInterface";

export class BaseRequestDto implements RequestInterface{

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: Object.values(GamingProviderEnum)})
  @IsEnum(GamingProviderEnum)
  readonly gameProvider: GamingProviderEnum;


}