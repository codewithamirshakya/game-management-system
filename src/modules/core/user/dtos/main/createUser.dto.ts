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
import { BaseRequestDto } from "@src/modules/core/shared/application/dto/baseRequest.dto";
import { GamingProviderEnum } from "@src/modules/core/shared/domain/interface/RequestInterface";
import { isExists } from "@src/modules/core/shared/infrastructure/persistence/utils/isExists";
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

}

class Channel {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly wrapped: Boolean;

}
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

export class CreateUserDto extends BaseRequestDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "'ARP_STUDIO' or 'EVOLUTION' or  'VELA_GAMING'" })
  @IsEnum(GamingProviderEnum)
  readonly gameProvider: GamingProviderEnum;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
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
