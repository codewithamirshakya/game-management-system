import { IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GamingProviderEnum, RequestInterface } from "../../domain/interface/RequestInterface";

export class BaseRequestDto implements RequestInterface{

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: Object.values(GamingProviderEnum)})
  @IsEnum(GamingProviderEnum)
  readonly gameProvider: GamingProviderEnum;

  // @IsObject()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly request: Object;

}