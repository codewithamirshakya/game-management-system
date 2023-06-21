import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt, IsPositive, IsEnum, ValidateIf, IsBoolean, IsNumber, Max } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GamingProviderEnum } from "@src/modules/core/common/interface/RequestInterface";
import { isExists } from "@src/modules/core/common/utils/isExits";

enum GameProviderBets {
    'evolution' = "evolution",
    'netent' = "netent",
    'redtiger' = "redtiger",
}
export class DetailBetDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "'ARP_STUDIO', 'OPMG','EVOLUTION'" })
    @IsEnum(GamingProviderEnum)
    readonly gameProvider: GamingProviderEnum;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @IsString()
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


    // Evolution
    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    readonly start_date: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    readonly end_date: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly game_type: string;
    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly channel: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly rounding: boolean;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ enum: ['evolution', 'netent', 'redtiger'] })
    @IsOptional()
    @IsEnum(GameProviderBets)
    readonly game_provider_bet: GameProviderBets;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly transaction_id: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly ow_transaction_id: string;

    // Vela
    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly host_id: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly key: string;

    @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Max(500)
    @ApiPropertyOptional()
    @IsOptional()
    readonly page_size: string;
}
