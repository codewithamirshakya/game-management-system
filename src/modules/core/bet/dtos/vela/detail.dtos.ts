import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { DetailBetDto } from "../main/detail.dtos";
export class VelaBetDto {
    constructor(dto: DetailBetDto) {
        this.host_id = dto.username;
        this.key = dto.key;
        this.page_size = dto.page_size;

    }

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly host_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly key: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Max(500)
    @ApiPropertyOptional()
    @IsOptional()
    readonly page_size: string;






}