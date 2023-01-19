import { IsString, IsNotEmpty, IsOptional, IsInt, IsPositive } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
export class DetailAccountDto {
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
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly begintime: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly endtime: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly index: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsPositive()
    @ApiProperty()
    @IsNotEmpty()
    readonly size: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly currenttime: number;
}
