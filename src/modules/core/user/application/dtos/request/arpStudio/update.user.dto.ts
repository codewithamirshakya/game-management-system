import { IsString, IsInt, IsNotEmpty, IsEmpty, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
enum StateType {
    'zero' = 0 ,
    'Minus one'= -1,
    'Minus two' = -2
}
export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly appid: string;

    @IsString()
    readonly username: string;

    @IsString()
    @IsOptional()
    readonly nickname: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ enum: ['0', '-1', '2']})
    @IsEnum(StateType)
    readonly state: StateType;

    @IsInt()
    @IsOptional()
    readonly currenttime: number;
}
