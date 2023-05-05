import { IsString, IsInt, IsOptional, IsEnum, ValidateIf } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GamingProviderEnum } from "src/modules/core/shared/application/dto/apiRequest.dto";
import { BaseRequestDto } from "src/modules/core/shared/application/dto/baseRequest.dto";
enum StateType {
    'zero' = 0 ,
    'Minus one'= -1,
    'Minus two' = -2
}
export class UpdateUserDto extends BaseRequestDto{
    @IsString()
    @ApiProperty()
    readonly username: string;

    @ValidateIf(x => x.gameProvider === GamingProviderEnum.ARP_STUDIO)
    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly nickname: string;

    @ValidateIf(x => x.gameProvider === GamingProviderEnum.ARP_STUDIO)
    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['0', '-1', '2']})
    @IsEnum(StateType)
    readonly state: StateType;

    @ValidateIf(x => x.gameProvider === GamingProviderEnum.ARP_STUDIO)
    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    readonly currenttime: number;
}
