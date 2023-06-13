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
      const serverResponse= await this.getgameList(hostId);
        if (serverResponse && serverResponse.status_code == 0) {
          const responseData = await serverResponse ? serverResponse.list.map((item) => {
            return this.makeResponseData(item)
          }) : []
        return responseData
        }
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

    makeResponseData(data) {
      return {
        game_name: data?data.title.en:null,
        game_desc: data?data.gamedesc:null,
        game_id: data?data.game_id:null,
        game_type: data?data.game_code:null,
        settings: data,
      }
    }
}