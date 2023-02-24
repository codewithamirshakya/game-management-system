import { ApiRequestDto } from "../dto/apiRequest.dto";
import { GameProviderConstant } from "../constants/gameProvider.constant";
import { Inject, Injectable } from "@nestjs/common";
import { VelaGamingRequestService } from "./velaGaming.request.service";
import { EvolutionRequestService } from "./evolution.request.service";
import { EvolutionRequestDto } from "../dto/evolution.request.dto";
import { ArpStudioRequestService } from "./arpStudio.request.service";

@Injectable()
export class ApiRequestService {

  @Inject(VelaGamingRequestService)
  private readonly velaRequestService: VelaGamingRequestService;

  @Inject(EvolutionRequestService)
  private readonly evolutionRequestService: EvolutionRequestService;

  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

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

    }
  }
}