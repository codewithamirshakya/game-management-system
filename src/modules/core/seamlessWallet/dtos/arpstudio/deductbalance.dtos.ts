import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ArpStudioDeductBalanceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    notify_id: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    // @IsInt()
    // @ApiPropertyOptional()
    // @IsNotEmpty()
    // type: number;

    @IsString()
    @ApiPropertyOptional()
    @IsNotEmpty()
    serial_number: string;

    @Transform(({ value }) => -value)
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    amount: number;


}