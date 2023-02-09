import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

enum PlayModeEnum {
  'real_money' = "real_money" ,
  'reward_games'= "reward_games",
  'play_for_fun'= "play_for_fun",
  'demo'= "demo",
}

class Brand {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(16)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @MaxLength(10)
  readonly skin: string;
}
class Table {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly seat: number;
}

class Channel {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly wrapped: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly mobile: Boolean;
}

class Game {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly interface: string;

  @Type(() => Table)
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @ValidateNested()
  readonly table: Table;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ enum: ['real_money', 'reward_games','play_for_fun','demo']})
  @IsOptional()
  @IsEnum(PlayModeEnum)
  readonly playMode: PlayModeEnum;
}

class Urls {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @ApiPropertyOptional()
  readonly cashier: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly responsibleGaming: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lobby: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly sessionTimeout: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly gameHistory: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly realityCheckURL: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngGoLiveURL: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngGoLiveURLMobile: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngLobbyButton: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngCloseButton: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngHomeButton: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngSessionTimeout: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly rngErrorHandling: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly sweSelfTest: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly sweGameLimits: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  readonly sweSelfExclusion: string;
}

export class ConfigDto {
  @Type(() => Brand)
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  readonly brand: Brand;

  @Type(() => Game)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @ValidateNested()
  readonly game: Game;

  @Type(() => Channel)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly channel: Channel;

  @Type(() => Urls)
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  readonly urls: Urls;

  @IsBoolean()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly freeGames: boolean;
}






