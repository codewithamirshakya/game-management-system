import {IsString, IsNotEmpty, IsOptional,IsBoolean} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
export class GetPlayersGameReportDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly playerId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly gameId: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly rounding: boolean;
}
