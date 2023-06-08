import { Transform} from "class-transformer";
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf
} from "class-validator";
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { BaseRequestDto } from "@src/modules/core/shared/application/dto/baseRequest.dto";
import { GamingProviderEnum } from "@src/modules/core/shared/domain/interface/RequestInterface";
import { isExists } from "@src/modules/core/shared/infrastructure/persistence/utils/isExists";

export class GetBalanceDto extends BaseRequestDto{

  @ValidateIf(x => isExists(x.gameProvider, [GamingProviderEnum.ARP_STUDIO, GamingProviderEnum.VELA_GAMING]))
  @IsString()
  @ApiProperty({required:  true})
  @IsNotEmpty()
  readonly username: string;

  // @ValidateIf(x => x.gameProvider === GamingProviderEnum.ARP_STUDIO)
  // @IsInt()
  // @ApiProperty({required:  false})
  // @IsOptional()
  // readonly atype: number;


}