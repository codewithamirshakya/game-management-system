import { GameProviderConstant } from "../constants/gameProvider.constant";
import { ArpStudioRequestDto } from "./arpStudio.request.dto";
import { VelaRequestDto } from "./vela.request.dto";
import { EvolutionRequestDto } from "./evolution.request.dto";
import { DataTransferObject } from "@src/lib/dto/dataTransferObject";
import { OpmgDto } from "./opmg.request.dto";

export enum GamingProviderEnum {
  ARP_STUDIO = GameProviderConstant.ARP_STUDIO,
  EVOLUTION = GameProviderConstant.EVOLUTION,
  VELA_GAMING = GameProviderConstant.VELA_GAMING,
  OPMG = GameProviderConstant.OPMG
}

export class ApiRequestDto extends DataTransferObject{

  readonly gameProvider: GamingProviderEnum;

  readonly requestDTO : (ArpStudioRequestDto | VelaRequestDto | EvolutionRequestDto|OpmgDto)
}