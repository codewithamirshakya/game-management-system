import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
enum GameMode {
    'singleplayer' = "singleplayer" ,
    'multiplayer'= "multiplayer",
}

enum Lang {
    'ch' = "ch" ,
    'en'= "en",
}

enum AllowVertical {
    'one' = 1 ,
    'zero'= 0,
}
export class LaunchGameDto {
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly host_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly gameUrl: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly access_token: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ enum: ['singleplayer', 'multiplayer']})
    @IsOptional()
    @IsEnum(GameMode)
    readonly mode: GameMode;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ enum: ['ch', 'en']})
    @IsOptional()
    @IsEnum(Lang)
    readonly lang: Lang;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['0', '1']})
    @IsEnum(AllowVertical)
    readonly allow_vertical: AllowVertical;
}
