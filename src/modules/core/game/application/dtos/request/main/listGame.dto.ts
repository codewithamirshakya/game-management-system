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
import { GamingProviderEnum } from "../../../../../shared/domain/interface/RequestInterface";
import { BaseRequestDto } from "../../../../../shared/application/dto/baseRequest.dto";
import { isExists } from "../../../../../shared/infrastructure/persistence/utils/isExists";
export enum EvolutionFormatEnum {
  PLAIN = 'PLAIN',
  OBJECT = 'OBJECT',
}
export class ListGameDto extends BaseRequestDto{

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsEnum(EvolutionFormatEnum)
  @ApiProperty({ enum: Object.values(EvolutionFormatEnum)})
  @IsNotEmpty()
  @ApiProperty()
  readonly format: EvolutionFormatEnum;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @ApiProperty({required:  false})
  @IsNotEmpty()
  @ApiProperty()
  readonly withBets: boolean;

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

}