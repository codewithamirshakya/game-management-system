import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";

class TableData {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly vid: string;
}

class DetailData {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly table: TableData;
}

class GameData {

    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    @ApiPropertyOptional()
    readonly type: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly details: DetailData;
}

class Transaction {

    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    @ApiPropertyOptional()
    readonly type: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly refId: string;

    @IsDecimal()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly amount: number;
}
export class DepositEvoutionWalletDto {

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
    game: GameData;

    @IsOptional()
    @ApiProperty()
    transaction: Transaction;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    uuid: string;


}