import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
export class GetBalanceWalletDto {


    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly notify_id: string;


}