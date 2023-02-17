import {IsString, IsNotEmpty, IsOptional, IsEnum} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum GameVerticalEnum {
    'live'= 'live',
    'rng' = 'rng',
    'slots' = 'slots'
}

enum GameProviderEnum {
    'evolution'= 'evolution',
    'redtiger' = 'redtiger',
    'netent' = 'netent',
    'btg'= 'btg',
    'nlc' = 'nlc'
}
export class GetCasinoStateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly casinoId: string;

    @IsEnum(GameVerticalEnum)
    @IsNotEmpty()
    @ApiPropertyOptional({enum: ['live','rng','slots']})
    @IsOptional()
    readonly gameVertical: GameVerticalEnum;


    @IsEnum(GameProviderEnum)
    @IsNotEmpty()
    @ApiPropertyOptional({enum: ['evolution','redtiger','netent','btg','nlc']})
    @IsOptional()
    readonly gameProvider: GameProviderEnum;
}
