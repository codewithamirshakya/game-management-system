import { IsString, IsEmail } from 'class-validator';

export class GetUserDto {
    @IsString()
    readonly fullName: string;

    @IsEmail()
    readonly email: string;
}
