import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ArpStudioRequestDto } from "@src/modules/core/common/dto/arpStudio.request.dto";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ArpstudioBetInterface } from "../../interface/arpstudioBet.interface";


export class GetArpstudioBetDetailService {
    constructor(
        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService,

    ) { }

    async getDetail(dto: ArpstudioBetInterface) {
        console.log(dto)
        return await this.getDetailBet(dto);
    }

    async getDetailBet(dto: ArpstudioBetInterface): Promise<any> {
        return await this.apiRequestService.requestApi(new ApiRequestDto({
            gameProvider: GameProviderConstant.ARP_STUDIO,
            requestDTO: new ArpStudioRequestDto({
                method: 'GET',
                params: dto,
                endpoint: '/record/bets/detail'
            })
        }));
    }
}