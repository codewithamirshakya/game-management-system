import { IsString, IsNotEmpty, IsOptional, IsInt, MaxLength, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseRequestDto } from "../../../../../shared/application/dto/baseRequest.dto";
import { GamingProviderEnum } from "../../../../../shared/domain/interface/RequestInterface";
export class GetDetailDto extends BaseRequestDto{
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @ValidateIf(x => x.gameProvider === GamingProviderEnum.ARP_STUDIO)
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    @IsOptional()
    readonly currenttime: number;

    // @IsString()
    // @IsNotEmpty()
    // @ApiPropertyOptional()
    // @IsOptional()
    // @MaxLength(16)
    // readonly euID: string;

    @ValidateIf(x => x.gameProvider === GamingProviderEnum.EVOLUTION)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(1)
    readonly output: string;

    // @ValidateIf(x => x.gameProvider === GamingProviderEnum.EVOLUTION)
    // @ValidateIf(x => x.euID === undefined)
    // @MaxLength(16,{message: 'Either (uID or euID) must be shorter than or equal to 16 characters'})
    // @IsString({message: 'Either (uID or euID) parameter must be string.'})
    // @IsNotEmpty({message: 'Either (uID or euID) parameter is required.'})
    // @ApiProperty()
    // readonly uID: string;
}
