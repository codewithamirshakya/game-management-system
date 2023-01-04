import { IsString, IsEmail, MaxLength, MinLength, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @MaxLength(100)
    @MinLength(5)
    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsInt()
    @ApiProperty()
    readonly gameProvider: number;

}
