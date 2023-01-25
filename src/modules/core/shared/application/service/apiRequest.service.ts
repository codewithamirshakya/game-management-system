import { ApiRequestDto } from "../dto/apiRequest.dto";
import { GameProviderConstant } from "../constants/gameProvider.constant";
import { Inject, Injectable } from "@nestjs/common";
import { VelaGamingRequestService } from "./velaGaming.request.service";

@Injectable()
export class ApiRequestService {

  @Inject(VelaGamingRequestService)
  private readonly velaRequestService: VelaGamingRequestService;

  async requestApi (apiRequestDTO: ApiRequestDto) {
    switch (apiRequestDTO.gameProvider) {
      case (GameProviderConstant.VELA_GAMING): {
      return await this.velaRequestService.request(apiRequestDTO.requestDTO);
      }

    }
  }
}