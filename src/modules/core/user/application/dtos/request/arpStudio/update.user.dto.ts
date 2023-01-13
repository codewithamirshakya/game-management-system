import { IsString, IsInt, IsNotEmpty, IsEmpty, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
enum StateType {
    'zero' = 0 ,
    'Minus one'= -1,
    'Minus two' = -2
}
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly appid: string;

    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly nickname: string;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['0', '-1', '2']})
    @IsEnum(StateType)
    readonly state: StateType;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    readonly currenttime: number;
}
