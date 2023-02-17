import {WithdrawBalanceDto as DomainWithdrawBalanceDto} from "../../../domain/dto/request/evolution/withdrawBalance.dto";
import {Inject} from "@nestjs/common";
import {TYPES} from "../../constants/types";
import {Transactional} from "typeorm-transactional";
import {SaveTransactionRepositoryInterface} from "../../../domain/repository/saveTransaction.repository.interface";
import {TransactionTypeConstant} from "../../../domain/constants/transactionType.constant";
import {GameProviderConstant} from "../../../../shared/application/constants/gameProvider.constant";
import {SaveTransactionDto} from "../../../domain/dto/request/saveTransaction.dto";
import {
    SaveTransactionDto as SaveEvolutionTransactionDto
} from "../../../domain/dto/request/evolution/saveTransaction.dto";
import {SHARED_TYPES} from "../../../../../shared/application/constants/types";
import {FundRepositoryInterface} from "../../../domain/repository/evolution/fund.repository.interface";
import {
    SaveEvolutionTransactionRepositoryInterface
} from "../../../domain/repository/evolution/saveEvolutionTransaction.repository.interface";
import {Request} from "express";
import {EventDefinition} from "../../../../shared/application/constants/eventDefinition";
import {ActivityCompletedEvent} from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import {ActivityTypeConstant} from "../../../../shared/domain/constants/activityType.constant";
import {EvolutionTransactionFailedException} from "../../../domain/exception/evolutionTransactionFailed.exception";
import {AsyncEventDispatcherInterface} from "../../../../../shared/application/EventBus/asyncEventDispatcher.interface";
import {WithdrawBalanceDto} from "../../dtos/request/evolution/withdrawBalance.dto";
import {WithdrawOperationFailedException} from "../../../domain/exception/withdrawOperationFailed.exception";
import {FundTransferValidationService} from "../validation/evolution/fundTransferValidation.service";

export class WithdrawBalanceService {
    constructor(
        @Inject(TYPES.evolutionRepository.FundRepositoryInterface) private repo: FundRepositoryInterface,
        @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
        @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
        @Inject(TYPES.evolutionRepository.SaveEvolutionTransactionRepositoryInterface) private saveEvolutionTransactionRepo: SaveEvolutionTransactionRepositoryInterface,
        private fundTransferValidationService: FundTransferValidationService,
    ) {
    }

    @Transactional()
    public async withdrawBalance(dto: WithdrawBalanceDto, req: Request, ip: string) {
        // validation
        const userId = await this.fundTransferValidationService.validate(dto);
        try {

            const response = await this.repo.request(new DomainWithdrawBalanceDto(dto));
            if(response.transfer.result._text === 'N') {
                throw new EvolutionTransactionFailedException(response);
            }

            // save main transaction table
            const mainTransaction = await this.saveTransactionRepo.save(
                new SaveTransactionDto(
                    {
                        type: TransactionTypeConstant.WITHDRAW,
                        status: 1,
                        amount: dto.amount,
                        user_id: userId,
                        currency_code: "USD",
                        game_provider: GameProviderConstant.EVOLUTION
                    }
                )
            );
            //save evolution transaction
            await this.saveEvolutionTransactionRepo.save(new SaveEvolutionTransactionDto({
                main_transaction_id: mainTransaction.id,
                available_balance: response.transfer.balance._text,
                trans_id: response.transfer.transid._text,
                e_transaction_id: response.transfer.etransid._text,
                e_transaction_time: new Date(response.transfer.datetime._text)
            }));

            //activity completed event dispatch
            await this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
                new ActivityCompletedEvent(
                    GameProviderConstant.EVOLUTION,
                    ActivityTypeConstant.FUNDS_TRANSFER,
                    "[Funds withdrawn from evolution's player wallet successfully.]",
                    ip,
                    req.headers["user-agent"],
                    userId
                ));
            return response;
        } catch (e) {
            throw new WithdrawOperationFailedException(e);
        }
    }
}