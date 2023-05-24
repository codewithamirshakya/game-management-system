import { Transactional } from "typeorm-transactional";
import { EvolutionDepositBalance } from "../../interface/evolution/deposit-balance.interface";
import { Inject } from "@nestjs/common";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { EvolutionRequestDto } from "@src/modules/core/common/dto/evolution.request.dto";
import { WithdrawOperationFailedException } from "../../exception/withdrawOperationFailed.exception";
import { EvolutionConfig } from "@src/config/evolution.config";
import { EvolutionTransactionFailedException } from "../../exception/evolutionTransactionFailed.exception";

export class EvolutionWithdrawBalanceService {
    constructor(
        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService
    ) {}

    async withdrawBalance(dto: EvolutionDepositBalance) {
        // validation
        // const userId = await this.fundTransferValidationService.validate(dto);
        try {

            const depositRequestDto = {
                cCode:  'EDB',
                ecID:EvolutionConfig.ecId,
                ...dto
            };
            const response = await this.request(depositRequestDto);
            if(response.transfer.result._text === 'N') {
                throw new EvolutionTransactionFailedException(response);
            }
            return response;
        } catch (e) {
            throw new WithdrawOperationFailedException(e);
        }
    }

    async request(dto: any){
        return await this.apiRequestService.requestApi(new ApiRequestDto({
          gameProvider : GameProviderConstant.EVOLUTION,
          requestDTO: new EvolutionRequestDto({
            method: 'GET',
            params: dto,
            endpoint: '/api/ecashier'
          })
        }));
      }
}