import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { DetailBetDto } from "../main/detail.dtos";
export class EvolutionBetDto {
    constructor(dto: DetailBetDto) {
        this.startDate = dto.start_date;
        this.endDate = dto.end_date;
        this.gameType = dto.game_type;
        this.channel = dto.channel;
        this.rounding = dto.rounding;
        this.gameProvider = dto.game_provider_bet;
        this.transactionId = dto.transaction_id;
        this.owTransactionId = dto.ow_transaction_id;
    }

    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    readonly startDate: string;

    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    readonly endDate: string;

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
    @ApiPropertyOptional({ enum: ['evolution', 'netent', 'redtiger'] })
    @IsOptional()
    readonly gameProvider: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly transactionId: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly owTransactionId: string;






}