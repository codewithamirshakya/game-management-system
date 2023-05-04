import { Transform} from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf
} from "class-validator";
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { BaseRequestDto } from "src/modules/core/shared/application/dto/baseRequest.dto";
import { GamingProviderEnum } from "src/modules/core/shared/domain/interface/RequestInterface";
import { isExists } from "src/modules/core/shared/infrastructure/persistence/utils/isExists";

export class CreateUserDto extends BaseRequestDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "'ARP_STUDIO' or 'EVOLUTION' or  'VELA_GAMING'" })
    @IsEnum(GamingProviderEnum)
    readonly gameProvider: GamingProviderEnum;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO, GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({required:  false,example: "hello_world" })
  @IsNotEmpty()
  readonly username: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO]))
  @IsString()
  @ApiProperty({required:  false,example: "test" })
  @IsNotEmpty()
  readonly nickname: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({required:  false,example: "PHP"})
  @IsNotEmpty()
  readonly currency: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({required:  false,example: "hello_world"})
  @IsNotEmpty()
  readonly host_id: string;

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({required:  false,example: "test"})
  @IsNotEmpty()
  readonly member_id: string;


}