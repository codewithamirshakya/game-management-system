import { ApiRequestDto } from "../dto/apiRequest.dto";
import { GameProviderConstant } from "../constants/gameProvider.constant";
import { Inject, Injectable } from "@nestjs/common";
import { VelaGamingRequestService } from "./velaGaming.request.service";
import { EvolutionRequestService } from "./evolution.request.service";
import { EvolutionRequestDto } from "../dto/evolution.request.dto";
import { ArpStudioRequestService } from "./arpStudio.request.service";
import { OpmgRequestService } from "./opmg.request.service";

@Injectable()
export class ApiRequestService {

  @Inject(VelaGamingRequestService)
  public readonly velaRequestService: VelaGamingRequestService;

  @Inject(EvolutionRequestService)
  public readonly evolutionRequestService: EvolutionRequestService;

  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  @Inject(OpmgRequestService)
  public opmgRequestService: OpmgRequestService

  async requestApi (apiRequestDTO: ApiRequestDto) {
    switch (apiRequestDTO.gameProvider) {

      case (GameProviderConstant.ARP_STUDIO): {
        return await this.arpStudioRequestService.request(apiRequestDTO.requestDTO);
      }

      case (GameProviderConstant.VELA_GAMING): {
      return await this.velaRequestService.request(apiRequestDTO.requestDTO);
      }

      case (GameProviderConstant.EVOLUTION): {
        return await this.evolutionRequestService.request(apiRequestDTO.requestDTO as EvolutionRequestDto);
      }

      case (GameProviderConstant.OPMG): {
        return await this.opmgRequestService.request(apiRequestDTO.requestDTO);
      }

    }
  }
}