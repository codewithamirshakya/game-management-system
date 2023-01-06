import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { toNumber } from "../../../../../../../lib/utils/cast.utils";
export class DetailUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly appid: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiProperty()
    @IsOptional()
    readonly currenttime: number;
}
