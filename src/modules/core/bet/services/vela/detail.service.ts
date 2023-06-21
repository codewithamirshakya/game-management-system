import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgBetInterface } from "../../interface/opmgBet.interface";
import { VelaBetInterface } from "../../interface/velaBet.interface";
import { VelaRequestDto } from "@src/modules/core/common/dto/vela.request.dto";


export class VelaBetDetailService {
    constructor(
        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService,

    ) { }

    async getDetail(dto:VelaBetInterface) {
        return await this.getDetailBet(dto);
    }

    async getDetailBet(dto: VelaBetInterface){
        return await this.apiRequestService.requestApi(new ApiRequestDto({
          gameProvider : GameProviderConstant.VELA_GAMING,
          requestDTO: new VelaRequestDto({
            method: 'GET',
            params: dto,
            endpoint: '/report'
          })
        }));
      }
}