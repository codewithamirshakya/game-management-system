import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ArpstudioBetInterface } from "../../interface/arpstudioBet.interface";
import { OpmgDto } from "@src/modules/core/common/dto/opmg.request.dto";
import { OpmgBetInterface } from "../../interface/opmgBet.interface";


export class OpmgBetDetailService {
    constructor(
        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService,

    ) { }

    async getDetail(host_id?: string) {
        const betDto = {
            host_id: 'SiG',
          };
        return await this.getDetailBet(betDto);
    }

    async getDetailBet(dto: OpmgBetInterface): Promise<any> {
        return await this.apiRequestService.requestApi(new ApiRequestDto({
            gameProvider: GameProviderConstant.OPMG,
            requestDTO: new OpmgDto({
                method: 'GET',
                params: dto,
                endpoint: 'platform_bets'
            })
        }));
    }
}