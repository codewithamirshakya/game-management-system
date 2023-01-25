import { GameProviderConstant } from "../constants/gameProvider.constant";
import { ArpStudioRequestDto } from "./arpStudio.request.dto";
import { VelaRequestDto } from "./vela.request.dto";
import { DataTransferObject } from "../../../../../lib/dto/dataTransferObject";

export enum GamingProviderEnum {
  ARP_STUDIO = GameProviderConstant.ARP_STUDIO,
  EVOLUTION = GameProviderConstant.EVOLUTION,
  VELA_GAMING = GameProviderConstant.VELA_GAMING
}

export class ApiRequestDto extends DataTransferObject{
  readonly gameProvider: GamingProviderEnum;

  readonly requestDTO : (ArpStudioRequestDto | VelaRequestDto)
}