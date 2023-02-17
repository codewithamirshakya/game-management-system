import {IsString, IsNotEmpty, IsOptional, IsBoolean} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetRenderedResultByGameIdDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly gameId: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly gameProvider: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly gameHeader: boolean;
}
