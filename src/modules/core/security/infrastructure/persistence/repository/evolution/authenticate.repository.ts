import { AuthenticateRepositoryInterface } from "../../../../domain/repository/evolution/authenticate.repository.interface";
import { AuthenticateDto } from "../../../../domain/dto/request/evolution/authenticate.dto";
import { AuthenticateDto as ResponseAuthenticateDTO} from "../../../../domain/dto/response/evolution/authenticate.dto";
import { ApiRequestDto } from "../../../../../shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "../../../../../shared/application/constants/gameProvider.constant";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "../../../../../shared/application/service/apiRequest.service";
import { EvolutionConfig } from "../../../../../../../config/evolution.config";
import { EvolutionRequestDto } from "../../../../../shared/application/dto/evolution.request.dto";

export class AuthenticateRepository implements AuthenticateRepositoryInterface {

  @Inject(ApiRequestService)
  public apiRequestService: ApiRequestService

  public async authenticate(dto: AuthenticateDto) : Promise<ResponseAuthenticateDTO> {
    const authenticate =  await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'POST',
        params: dto,
        endpoint: '/ua/v1/'+EvolutionConfig.casinoKey+'/'+EvolutionConfig.apiToken
      })
    }));

    const userRequestDto = {
      cCode: 'GUI',
      ecID: EvolutionConfig.casinoKey+EvolutionConfig.apiToken,
      euID: dto.player.id,
      output: 1,
    };
    const userDetail =  await this.apiRequestService.requestApi(new ApiRequestDto({
      gameProvider : GameProviderConstant.EVOLUTION,
      requestDTO: new EvolutionRequestDto({
        method: 'GET',
        params: userRequestDto,
        endpoint: '/api/ecashier'
      })
    }));

    return new ResponseAuthenticateDTO({
      countryCode: userDetail.userdetails.countrycode._text,
      uid: userDetail.userdetails.uid._text,
      authenticateResponse: authenticate
    });
  }
}