import { IsString, IsInt, IsNotEmpty, IsEmpty, IsOptional } from "class-validator";

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
    readonly state: number;

    @IsInt()
    @IsOptional()
    readonly currenttime: number;
}
