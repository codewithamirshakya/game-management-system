import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class GetBalanceWalletDto {

    // allocated application id
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    appid: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    notifyid: string;

    @IsString()
    @ApiProperty()
    token: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    sign: string;


}