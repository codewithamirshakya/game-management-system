import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseRequestDto } from "src/modules/core/shared/application/dto/baseRequest.dto";
import { GamingProviderEnum } from "src/modules/core/shared/domain/interface/RequestInterface";
import { isExists } from "src/modules/core/shared/infrastructure/persistence/utils/isExists";

export class DepositBalanceDto extends BaseRequestDto{

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsString()
  @ApiProperty({required:  false})
  @IsNotEmpty()
  @ApiProperty()
  readonly notifyid: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO,GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;


  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  readonly tradeno: number;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsInt()
  @ApiPropertyOptional()
  @IsNotEmpty()
   atype: number;

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
  readonly source: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING,GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly transid: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(3)
  readonly currency: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly host_id: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly member_id: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(16)
  readonly euID: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(1)
  readonly output: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(1)
  readonly tcheck: string;

  @ValidateIf(x => x.gameProvider === GamingProviderEnum.EVOLUTION && x.euID === undefined)
  @MaxLength(16,{message: 'Either (uID or euID) must be shorter than or equal to 16 characters'})
  @IsString({message: 'Either (uID or euID) parameter must be string.'})
  @IsNotEmpty({message: 'Either (uID or euID) parameter is required.'})
  @ApiProperty({required:  false})
  readonly uID: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(1)
  readonly createuser: string;

}