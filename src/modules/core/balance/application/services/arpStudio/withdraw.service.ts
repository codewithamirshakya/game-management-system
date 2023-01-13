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

export class WithdrawService {
  constructor(
    @Inject(TYPES.repository.WithdrawBalanceRepositoryInterface) private repo: WithdrawBalanceRepositoryInterface,
    @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
  ) {}

  @Transactional()
  public withdrawBalance(dto: WithdrawBalanceDto) {
    try{
      const response = this.repo.withdraw(Object.assign(new DomainWithdrawBalanceDto(),dto));
      this.saveTransactionRepo.save(
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
      return response;
    } catch (e) {
      throw new WithdrawOperationFailedException(e)
    }
  }
}