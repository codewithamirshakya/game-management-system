import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class DepositMerchantBalanceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    notify_id: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly api_type: number;

    @IsString()
    @ApiPropertyOptional()
    @IsNotEmpty()
    serial_number: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    amount: number;


}