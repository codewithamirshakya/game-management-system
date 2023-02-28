import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { Transactional } from "typeorm-transactional";
import { SaveTransactionRepositoryInterface } from "../../../domain/repository/saveTransaction.repository.interface";
import { TransactionTypeConstant } from "../../../domain/constants/transactionType.constant";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { SaveTransactionDto } from "../../../domain/dto/request/saveTransaction.dto";
import { SaveTransactionDto as SaveVelaTransactionDto } from "../../../domain/dto/request/vela/saveTransaction.dto";
import {
  SaveVelaTransactionRepositoryInterface
} from "../../../domain/repository/velaGaming/saveVelaTransaction.repository.interface";
import { IsUserExistsValidationService } from "../validation/IsUserExistsValidation.service";
import { WithdrawBalanceDto } from "../../dtos/request/vela/withdrawBalance.dto";
import { WithdrawBalanceDto as DomainWithdrawBalanceDto } from "../../../domain/dto/request/vela/withdrawBalance.dto";
import {
  WithdrawBalanceRepositoryInterface
} from "../../../domain/repository/velaGaming/withdrawBalance.repository.interface";
import { WithdrawOperationFailedException } from "../../../domain/exception/withdrawOperationFailed.exception";

export class WithdrawBalanceService {
  constructor(
    @Inject(TYPES.velaRepository.WithdrawBalanceRepositoryInterface) private repo: WithdrawBalanceRepositoryInterface,
    @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
    @Inject(TYPES.velaRepository.SaveVelaTransactionRepositoryInterface) private saveVelaTransactionRepo: SaveVelaTransactionRepositoryInterface,
    private userExistsValidationService: IsUserExistsValidationService,
  ) {
  }

  @Transactional()
  public async withdrawBalance(dto: WithdrawBalanceDto) {
    console.log(dto);
    // validation
    const user = await this.userExistsValidationService.isUserExists(dto.member_id,GameProviderConstant.VELA_GAMING);
    try {
      const response = await this.repo.withdraw(new DomainWithdrawBalanceDto(dto));

      // save main transaction table
      const mainTransaction = await this.saveTransactionRepo.save(
        new SaveTransactionDto(
          {
            type: TransactionTypeConstant.WITHDRAW,
            status: 1,
            amount: dto.amount,
            user_id: user.id,
            currency_code: "PHP",
            game_provider: GameProviderConstant.VELA_GAMING
          }
        )
      );

      //save vela transaction
      await this.saveVelaTransactionRepo.save(new SaveVelaTransactionDto({
        main_transaction_id: mainTransaction.id,
        trans_id: dto.transid,
        available_balance: response.balance,
        vg_transaction_id: response.vg_transaction_id,
        vg_transaction_time: response.vg_transaction_time
      }));


      return response;
    } catch (e) {
      throw new WithdrawOperationFailedException(e);
    }
  }
}