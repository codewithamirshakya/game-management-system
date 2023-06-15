import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsPositive, IsEnum, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GamingProviderEnum } from "@src/modules/core/common/interface/RequestInterface";
import { isExists } from "@src/modules/core/common/utils/isExits";
export class DetailBetDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "'ARP_STUDIO', 'OPMG" })
    @IsEnum(GamingProviderEnum)
    readonly gameProvider: GamingProviderEnum;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly notifyid: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsNotEmpty()
    readonly atype: number;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly begintime: number;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly endtime: number;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly index: number;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly size: number;
    
    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly currenttime: number;
}
