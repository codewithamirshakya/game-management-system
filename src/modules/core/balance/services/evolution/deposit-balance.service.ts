import {Inject} from "@nestjs/common";
import {Transactional} from "typeorm-transactional";
import {Request} from "express";
import { ApiRequestService } from "@src/modules/core/common/service/apiRequest.service";
import { ApiRequestDto } from "@src/modules/core/common/dto/apiRequest.dto";
import { EvolutionRequestDto } from "@src/modules/core/common/dto/evolution.request.dto";
import { DepositOperationFailedException } from "../../exception/depositOperationFailed.exception";
import { EvolutionDepositBalance } from "../../interface/evolution/deposit-balance.interface";
import { GameProviderConstant } from "@src/modules/core/common/constants/gameProvider.constant";
import { EvolutionTransactionFailedException } from "../../exception/evolutionTransactionFailed.exception";
import { EvolutionConfig } from "@src/config/evolution.config";

export class EvolutionDepositBalanceService {
    constructor(
        @Inject(ApiRequestService)
        public apiRequestService: ApiRequestService
    ) {
    }

    @Transactional()
     async depositBalance(dto: EvolutionDepositBalance, req: Request, ip: string) {
        // validation
        // const userId = await this.fundTransferValidationService.validate(dto);
        try {
            const depositRequestDto = {
                cCode:  'ECR',
                ecID:EvolutionConfig.ecId,
                ...dto
            };
            const response = await this.request(depositRequestDto);
            if(response.transfer.result._text === 'N') {
                throw new EvolutionTransactionFailedException(response);
            }

            // // save main transaction table
            // const mainTransaction = await this.saveTransactionRepo.save(
            //     new SaveTransactionDto(
            //         {
            //             type: TransactionTypeConstant.DEPOSIT,
            //             status: 1,
            //             amount: dto.amount,
            //             user_id: userId,
            //             currency_code: dto.currency ? dto.currency : "PHP",
            //             game_provider: GameProviderConstant.EVOLUTION
            //         }
            //     )
            // );
            // //save evolution transaction
            // await this.saveEvolutionTransactionRepo.save(new SaveEvolutionTransactionDto({
            //     main_transaction_id: mainTransaction.id,
            //     available_balance: response.transfer.balance._text,
            //     trans_id: response.transfer.transid._text,
            //     e_transaction_id: response.transfer.etransid._text,
            //     e_transaction_time: new Date(response.transfer.datetime._text)
            // }));

            //activity completed event dispatch
            // await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
            //     new ActivityCompletedEvent(
            //         GameProviderConstant.EVOLUTION,
            //         ActivityTypeConstant.FUNDS_TRANSFER,
            //         "[Funds transfer to evolution's player wallet successfully.]",
            //         ip,
            //         req.headers["user-agent"],
            //         userId,
            //     ));
            return response;
        } catch (e) {
            throw new DepositOperationFailedException(e);
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