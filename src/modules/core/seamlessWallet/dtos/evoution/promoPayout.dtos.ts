import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class JackpotData {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly id: string;

    @IsDecimal({ decimal_digits: '6' })
    @IsNotEmpty()
    @ApiProperty()
    readonly winAmount: number;
}

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

class PromoTransaction {

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

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly remainingRounds: number;

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ type: JackpotData, isArray: true })
    readonly jackpots: JackpotData[];

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly playableBalance: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly bonusConfigId: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    readonly rewardId: string;
}
export class PromoPayoutDto {

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
    promoTransaction: PromoTransaction;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    uuid: string;


}