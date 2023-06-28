import {
  IsBoolean, IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GamingProviderEnum } from "../../../common/interface/RequestInterface";
import { BaseRequestDto } from "../../../common/dto/baseRequest.dto";
import { isExists } from "@src/modules/core/common/utils/isExits";
export enum EvolutionFormatEnum {
  PLAIN = 'PLAIN',
  OBJECT = 'OBJECT',
}
export class ListGameDto extends BaseRequestDto{

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiPropertyOptional()
  @IsOptional()
  readonly currenttime: number;


  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly notifyid: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.OPMG]))
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  readonly opmg: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.OPMG]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()  readonly arps: string;


  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.OPMG]))
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @ApiPropertyOptional()
  @IsOptional()
  readonly show: string;

}