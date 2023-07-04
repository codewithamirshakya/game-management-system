import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DepositMerchantBalanceDto {
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

    @Transform(({ value }) => -value)
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
    @IsOptional()
    @ApiProperty()
    token: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    sign: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    bets: string;


}