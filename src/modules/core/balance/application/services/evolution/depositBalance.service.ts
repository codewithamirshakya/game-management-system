import { DepositBalanceDto as DomainDepositBalanceDto } from "../../../domain/dto/request/evolution/depositBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { Transactional } from "typeorm-transactional";
import { SaveTransactionRepositoryInterface } from "../../../domain/repository/saveTransaction.repository.interface";
import { TransactionTypeConstant } from "../../../domain/constants/transactionType.constant";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { SaveTransactionDto } from "../../../domain/dto/request/saveTransaction.dto";
import { SaveTransactionDto as SaveVelaTransactionDto } from "../../../domain/dto/request/vela/saveTransaction.dto";
import { DepositOperationFailedException } from "../../../domain/exception/depositOperationFailed.exception";
import { DepositBalanceDto } from "../../dtos/request/evolution/depositBalance.dto";
import {
  SaveVelaTransactionRepositoryInterface
} from "../../../domain/repository/velaGaming/saveVelaTransaction.repository.interface";
import { IsUserExistsValidationService } from "../validation/IsUserExistsValidation.service";
import { EventDefinition } from "src/modules/core/shared/application/constants/eventDefinition";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";
import { FundRepositoryInterface } from "../../../domain/repository/evolution/fund.repository.interface";

export class DepositBalanceService {
  constructor(
    @Inject(TYPES.evolutionRepository.FundRepositoryInterface) private repo: FundRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
    @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
    @Inject(TYPES.velaRepository.SaveVelaTransactionRepositoryInterface) private saveVelaTransactionRepo: SaveVelaTransactionRepositoryInterface,
    private userExistsValidationService: IsUserExistsValidationService,
  ) {
  }

  @Transactional()
  public async depositBalance(dto: DepositBalanceDto) {
    const userID = dto.euID ? dto.euID : dto.uID;
    // validation
    const user = await this.userExistsValidationService.isUserExists(userID,GameProviderConstant.EVOLUTION);
    try {
      const response = await this.repo.request(new DomainDepositBalanceDto(dto));

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

      // //save vela transaction
      // await this.saveVelaTransactionRepo.save(new SaveVelaTransactionDto({
      //   main_transaction_id: mainTransaction.id,
      //   trans_id: dto.etransid,
      //   available_balance: response.balance,
      //   vg_transaction_id: response.vg_transaction_id,
      //   vg_transaction_time: response.vg_transaction_time
      // }));


      return response;
    } catch (e) {
      throw new DepositOperationFailedException(e);
    }
  }
}