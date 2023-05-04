import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class GetRebateWalletBalanceDto {
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly host_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly member_id?: string;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly key?: number;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly page_size?: number;

}
