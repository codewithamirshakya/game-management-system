import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
export class ListGameLobbyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly appid: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

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
