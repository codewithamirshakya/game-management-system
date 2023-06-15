import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsPositive, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { GamingProviderEnum } from "@src/modules/core/common/interface/RequestInterface";
export class DetailBetDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "'ARP_STUDIO', 'OPMG" })
    @IsEnum(GamingProviderEnum)
    readonly gameProvider: GamingProviderEnum;


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
    @IsNotEmpty()
    readonly atype: number;

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
