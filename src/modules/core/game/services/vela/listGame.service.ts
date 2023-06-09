import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/shared/application/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/shared/application/dto/apiRequest.dto";
import { GameProviderConstant } from "@src/modules/core/shared/application/constants/gameProvider.constant";
import { VelaRequestDto } from "@src/modules/core/shared/application/dto/vela.request.dto";

export class VelaListGameService {
    constructor(
      @Inject(ApiRequestService) public apiRequestService: ApiRequestService
    ) {}

    async getList(hostId?: string) {
        return await this.getgameList(hostId);
    }


    getgameList(hostId: string): Promise<any> {
      return this.apiRequestService.requestApi(new ApiRequestDto({
        gameProvider : GameProviderConstant.VELA_GAMING,
        requestDTO: new VelaRequestDto({
          method: 'GET',
          params: { host_id: hostId },
          endpoint: '/user/gamelist'
        })
      }));
    }
}