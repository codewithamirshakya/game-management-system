import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber, IsPositive, Max } from "class-validator";
import {  ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
export class GetGameReportDto {
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
