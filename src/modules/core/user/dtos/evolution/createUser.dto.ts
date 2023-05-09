import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateUserDto as MainCreateUserDto } from "../main/createUser.dto";

export class CreateEvolutionUserDto {

    constructor(dto: MainCreateUserDto) {
        // this.uuid = dto.uuid;
        // // this.player=dto.player
        // this.player.id=dto.player.id
        // this.player.update=dto.player.update
        // this.player.firstName=dto.player.firstName
        // this.player.lastName=dto.player.lastName
        // this.player.nickname=dto.player.nickname
        // this.player.country=dto.player.country
        // this.player.language=dto.player.language
        // this.player.currency=dto.player.currency
        // // this.player.session=dto.player.session
        // this.player.session.id=dto.player.session.id
        // this.player.session.ip=dto.player.session.ip
        
        // this.player.group.id=dto.player.group.id
        // this.player.group.action=dto.player.group.action
        // this.config.game.table.id=dto.config.game.table.id
        // this.config.channel.wrapped=dto.config.channel.wrapped
      }
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
   uuid: string;

  @Type(() => PlayerDto)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
   player: PlayerDto;

  @Type(() => ConfigDto)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
   config: ConfigDto;
}

export class PlayerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    update: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
     firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
     lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
     nickname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(2)
     country: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
     language: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(3)
    currency: string;

    @Type(() => Session)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    session: Session;

    @Type(() => Group)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
     group: Group;

  }


class Session {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(250)
   id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
    ip: string;
}

enum GroupAction {
  'assign' = "assign" ,
  'clear'= "clear",
}

class Group {

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(50)
   id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ['assign', 'clear']})
  @IsEnum(GroupAction)
   action: GroupAction;
}


enum PlayModeEnum {
  'real_money' = "real_money" ,
  'reward_games'= "reward_games",
  'play_for_fun'= "play_for_fun",
  'demo'= "demo",
}


class Table {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
   id: string;

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
 wrapped: Boolean;
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








