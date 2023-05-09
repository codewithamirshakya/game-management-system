import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested
} from "class-validator";
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { BaseRequestDto } from "src/modules/core/shared/application/dto/baseRequest.dto";
import { GamingProviderEnum } from "src/modules/core/shared/domain/interface/RequestInterface";
import { isExists } from "src/modules/core/shared/infrastructure/persistence/utils/isExists";
class Session {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(250)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ip: string;
}

enum GroupAction {
  'assign' = "assign",
  'clear' = "clear",
}

class Group {

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(50)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ['assign', 'clear'] })
  @IsEnum(GroupAction)
  readonly action: GroupAction;
}

class Table {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  // @IsInt()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiPropertyOptional()
  // readonly seat: number;
}

class Channel {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly wrapped: Boolean;

  // @IsBoolean()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiPropertyOptional()
  // readonly mobile: Boolean;
}

// class Urls {

//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty()
//   @ApiPropertyOptional()
//   readonly cashier: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly responsibleGaming: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly lobby: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly sessionTimeout: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly gameHistory: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly realityCheckURL: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngGoLiveURL: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngGoLiveURLMobile: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngLobbyButton: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngCloseButton: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngHomeButton: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngSessionTimeout: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly rngErrorHandling: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly sweSelfTest: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly sweGameLimits: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly sweSelfExclusion: string;
// }
class PlayerDto {
  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly update: boolean;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly firstName: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly lastName: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly nickname: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(2)
  readonly country: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly language: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(3)
  readonly currency: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @Type(() => Session)
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly session: Session;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @Type(() => Group)
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  readonly group: Group;

}

enum PlayModeEnum {
  'real_money' = "real_money",
  'reward_games' = "reward_games",
  'play_for_fun' = "play_for_fun",
  'demo' = "demo",
}

class Game {
  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiPropertyOptional()
  // readonly category: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiPropertyOptional()
  // readonly interface: string;

  @Type(() => Table)
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @ValidateNested()
  readonly table: Table;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ enum: ['real_money', 'reward_games', 'play_for_fun', 'demo'] })
  @IsOptional()
  @IsEnum(PlayModeEnum)
  readonly playMode: PlayModeEnum;
}



 class ConfigDto {

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

  @IsBoolean()
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  readonly freeGames: boolean;
}

// class Game {
//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly category: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly interface: string;

//   @Type(() => Table)
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   @ValidateNested()
//   readonly table: Table;

//   @IsString()
//   @IsNotEmpty()
//   @ApiPropertyOptional({ enum: ['real_money', 'reward_games', 'play_for_fun', 'demo'] })
//   @IsOptional()
//   @IsEnum(PlayModeEnum)
//   readonly playMode: PlayModeEnum;
// }



// class Table {

//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty()
//   readonly id: string;

//   @IsInt()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly seat: number;
// }

// class Channel {
//   @IsBoolean()
//   @IsNotEmpty()
//   @ApiProperty()
//   readonly wrapped: Boolean;

//   @IsBoolean()
//   @IsNotEmpty()
//   @IsOptional()
//   @ApiPropertyOptional()
//   readonly mobile: Boolean;
// }
export class CreateUserDto extends BaseRequestDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "'ARP_STUDIO' or 'EVOLUTION' or  'VELA_GAMING'" })
  @IsEnum(GamingProviderEnum)
  readonly gameProvider: GamingProviderEnum;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO, GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({ required: false, example: "hello_world" })
  @IsNotEmpty()
  readonly username: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsString()
  @ApiProperty({ required: false, example: "test" })
  @IsNotEmpty()
  readonly nickname: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({ required: false, example: "PHP" })
  @IsNotEmpty()
  readonly currency: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({ required: false, example: "hello_world" })
  @IsNotEmpty()
  readonly host_id: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({ required: false, example: "test" })
  @IsNotEmpty()
  readonly member_id: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @IsString()
  @ApiProperty({ required: false, example: "test" })
  @IsNotEmpty()
  readonly uuid: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @Type(() => PlayerDto)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
   player: PlayerDto;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.EVOLUTION]))
  @Type(() => ConfigDto)
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested()
  readonly config: ConfigDto;
}
