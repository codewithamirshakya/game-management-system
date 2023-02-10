import {DepositBalanceDto as DomainDepositBalanceDto} from "../../../domain/dto/request/evolution/depositBalance.dto";
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
import {DepositOperationFailedException} from "../../../domain/exception/depositOperationFailed.exception";
import {DepositBalanceDto} from "../../dtos/request/evolution/depositBalance.dto";
import {IsUserExistsValidationService} from "../validation/IsUserExistsValidation.service";
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

export class DepositBalanceService {
    constructor(
        @Inject(TYPES.evolutionRepository.FundRepositoryInterface) private repo: FundRepositoryInterface,
        @Inject(SHARED_TYPES.eventBus.AsyncEventDispatcherInterface) private eventDispatcher: AsyncEventDispatcherInterface,
        @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
        @Inject(TYPES.evolutionRepository.SaveEvolutionTransactionRepositoryInterface) private saveEvolutionTransactionRepo: SaveEvolutionTransactionRepositoryInterface,
        private userExistsValidationService: IsUserExistsValidationService,
    ) {
    }

    @Transactional()
    public async depositBalance(dto: DepositBalanceDto, req: Request, ip: string) {
        // if(dto.euID) {
            // validation
            const user = await this.userExistsValidationService.isUserExists(dto.euID, GameProviderConstant.EVOLUTION);
        // }
        try {

            const response = await this.repo.request(new DomainDepositBalanceDto(dto));
            if(response.transfer.result._text === 'N') {
                throw new EvolutionTransactionFailedException(response);
            }

            // save main transaction table
            const mainTransaction = await this.saveTransactionRepo.save(
                new SaveTransactionDto(
                    {
                        type: TransactionTypeConstant.DEPOSIT,
                        status: 1,
                        amount: dto.amount,
                        user_id: user.id,
                        currency_code: dto.currency ? dto.currency : "PHP",
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
                    "[Funds transfer to evolution's player wallet successfully.]",
                    ip,
                    req.headers["user-agent"],
                    user.id
                ));
            return response;
        } catch (e) {
            throw new DepositOperationFailedException(e);
        }
    }
}