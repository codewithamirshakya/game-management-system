import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
export class GetGameRoadSheetDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly appid: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiProperty()
    @IsNotEmpty()
    readonly gameid: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly notifyid: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly currenttime: number;
}
