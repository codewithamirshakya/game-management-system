import { AuthenticateRepositoryInterface } from "../../../../domain/repository/vela/authenticate.repository.interface";
import { AuthenticateDto } from "../../../../domain/dto/request/vela/authenticate.dto";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "../../../../../shared/application/dto/vela.request.dto";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";

export class AuthenticateRepository implements AuthenticateRepositoryInterface {

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  public async authenticate(dto: AuthenticateDto) {
    return await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.VELA_GAMING,
      requestDTO: new VelaRequestDto({
        method: 'GET',
        params: dto,
        endpoint: '/user/authenticate'
      })
    }));
  }
}