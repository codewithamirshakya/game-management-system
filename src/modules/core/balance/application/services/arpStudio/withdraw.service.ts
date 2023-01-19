import { WithdrawBalanceDto as DomainWithdrawBalanceDto } from "../../../domain/dto/request/arpStudio/withdrawBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { WithdrawBalanceDto } from "../../dtos/request/arpStudio/withdrawBalance.dto";
import {
  WithdrawBalanceRepositoryInterface
} from "../../../domain/repository/arpStudio/withdrawBalance.repository.interface";
import { Transactional } from "typeorm-transactional";
import { WithdrawOperationFailedException } from "../../../domain/exception/withdrawOperationFailed.exception";
import { SaveTransactionRepositoryInterface } from "../../../domain/repository/saveTransaction.repository.interface";
import { TransactionTypeConstant } from "../../../domain/constants/transactionType.constant";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { SaveTransactionDto } from "../../../domain/dto/request/saveTransaction.dto";
import { SaveTransactionDto as SaveArpTransactionDto } from "../../../domain/dto/request/arpStudio/saveTransaction.dto";
import {
  SaveTransactionRepositoryInterface as SaveArpTransactionRepositoryInterface
} from "../../../domain/repository/arpStudio/saveTransaction.repository.interface";

export class WithdrawService {
  constructor(
    @Inject(TYPES.repository.WithdrawBalanceRepositoryInterface) private repo: WithdrawBalanceRepositoryInterface,
    @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
    @Inject(TYPES.repository.SaveArpTransactionRepositoryInterface) private saveArpTransactionRepo: SaveArpTransactionRepositoryInterface
  ) {}

  @Transactional()
  public async withdrawBalance(dto: WithdrawBalanceDto) {
    try{
      const response = await this.repo.withdraw(Object.assign(new DomainWithdrawBalanceDto(),dto));
      const mainTransaction = await this.saveTransactionRepo.save(
        new SaveTransactionDto(
          {
            type: TransactionTypeConstant.WITHDRAW,
            status: 1,
            amount: dto.amount,
            user_id: 1,
            currency_code: 'USD',
            game_provider: GameProviderConstant.ARP_STUDIO
          }
        )
      )

      //save api transaction
      await this.saveArpTransactionRepo.save(new SaveArpTransactionDto({
        main_transaction_id: mainTransaction.id,
        account_type: response.atype,
        trade_no: dto.tradeno,
        source: dto.source
      }));
      return response;
    } catch (e) {
      throw new WithdrawOperationFailedException(e)
    }
  }
}