import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RollbackBalanceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    appid: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    notifyid: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @Transform(({ value }) => value)
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @ApiPropertyOptional()
    @IsNotEmpty()
    type: number;

    @IsString()
    @ApiPropertyOptional()
    @IsNotEmpty()
    serialnumber: string;

    @IsString()
    @ApiProperty()
    token: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    sign: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    errmsg: string;

}