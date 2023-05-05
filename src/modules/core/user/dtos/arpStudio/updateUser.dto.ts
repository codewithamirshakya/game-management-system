import { IsString, IsInt, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UpdateUserDto as MainUpdateUserDto } from "../main/updateUser.dto";

enum StateType {
    'zero' = 0 ,
    'Minus one'= -1,
    'Minus two' = -2
}
export class ArpStudioUpdateUserDto {

    constructor(dto: MainUpdateUserDto) {
        this.username = dto.username;
        this.nickname = dto.nickname;
        this.state = dto.state;
        this.currenttime = dto.currenttime;
    }
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
