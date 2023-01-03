import { IsString, IsEmail, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @MaxLength(100)
    @MinLength(5)
    @IsString()
    @ApiProperty()
    readonly fullName: string;

    @MinLength(8)
    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @MinLength(8)
    @MaxLength(100)
    @IsString()
    @ApiProperty()
    readonly address: string;
}
