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

    /**
     * Notify ID，message number
        of each notification is
        different，maybe will
        repeat receive response
        because internet break or
        slow，so need use notify id
        to check , avoid repeat
        deduct
     * 
     */
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