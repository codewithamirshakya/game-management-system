import { IsString, IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @MaxLength(100)
    @MinLength(5)
    @IsString()
    readonly fullName: string;

    @MinLength(8)
    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;

    @MinLength(8)
    @MaxLength(100)
    @IsString()
    readonly address: string;
}
