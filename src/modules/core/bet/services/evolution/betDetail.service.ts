import { Inject } from "@nestjs/common";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { EvolutionRequestDto } from "@src/modules/core/common/dto/evolution.request.dto";
import { EvolutionBetInterface } from "../../interface/evolutionBet.interface";


export class EvolutionBetDetailService {
    constructor(
        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService,

    ) { }

    async getDetail(dto: EvolutionBetInterface) {
        return await this.getDetailBet(dto);
    }

    getDetailBet(dto): Promise<any> {
        return this.apiRequestService.requestApi(new ApiRequestDto({
            gameProvider: GameProviderConstant.EVOLUTION,
            requestDTO: new EvolutionRequestDto({
                method: 'GET',
                params: dto,
                endpoint: '/api/gamehistory/v1/casino/games'
            })
        }));
    }
}