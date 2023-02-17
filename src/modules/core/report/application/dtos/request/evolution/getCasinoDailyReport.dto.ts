import {IsString, IsNotEmpty, IsOptional,IsDateString, IsBoolean} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class GetCasinoDailyReportDTO {
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

    readonly channel: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly playerCurrency: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly rounding: boolean;
}
