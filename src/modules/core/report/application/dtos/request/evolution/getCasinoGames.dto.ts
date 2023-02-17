import {IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsEnum} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
enum GameProvider {
    'evolution' = "evolution" ,
    'netent'= "netent",
    'redtiger'= "redtiger",
}
export class GetCasinoGamesDto {
    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    readonly startDate: Date;

    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    readonly endDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly gameType: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly channel: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly rounding: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ enum: ['evolution', 'netent','redtiger']})
    @IsOptional()
    @IsEnum(GameProvider)
    readonly gameProvider: GameProvider;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly transactionId: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly ownTransactionId: string;
}
