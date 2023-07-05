import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

class Table {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly vid: string;
}

class Details {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly table: Table;
}

class Game {

    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    @ApiPropertyOptional()
    readonly type: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly details: Details;
}
export class GetBalanceEvoutionWalletDto {

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    sid: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    currency: string;


    @IsOptional()
    @ApiProperty()
    game: Game;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    uuid: string;


}