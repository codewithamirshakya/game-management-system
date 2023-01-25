import { DepositBalanceDto as DomainDepositBalanceDto } from "../../../domain/dto/request/arpStudio/depositBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { WithdrawBalanceDto } from "../../dtos/request/arpStudio/withdrawBalance.dto";
import { Transactional } from "typeorm-transactional";
import { SaveTransactionRepositoryInterface } from "../../../domain/repository/saveTransaction.repository.interface";
import { SaveTransactionRepositoryInterface as SaveArpTransactionRepositoryInterface } from
    "../../../domain/repository/arpStudio/saveTransaction.repository.interface";
import { TransactionTypeConstant } from "../../../domain/constants/transactionType.constant";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { SaveTransactionDto } from "../../../domain/dto/request/saveTransaction.dto";
import { SaveTransactionDto as SaveArpTransactionDto } from "../../../domain/dto/request/arpStudio/saveTransaction.dto";
import {
  DepositBalanceRepositoryInterface
} from "../../../domain/repository/arpStudio/depositBalance.repository.interface";
import { DepositOperationFailedException } from "../../../domain/exception/depositOperationFailed.exception";
import { IsUserExistsValidationService } from "../validation/IsUserExistsValidation.service";

export class DepositService {
  constructor(
    @Inject(TYPES.repository.DepositBalanceRepositoryInterface) private repo: DepositBalanceRepositoryInterface,
    @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
    @Inject(TYPES.repository.SaveArpTransactionRepositoryInterface) private saveArpTransactionRepo: SaveArpTransactionRepositoryInterface,
    private userExistsValidationService: IsUserExistsValidationService,
  ) {
  }

  @Transactional()
  public async depositBalance(dto: WithdrawBalanceDto) {
    // validation
    const user = await this.userExistsValidationService.isUserExists(dto.username,GameProviderConstant.VELA_GAMING);
    try {
      const response = await this.repo.deposit(new DomainDepositBalanceDto(dto));

      // save main transaction table
      const mainTransaction = await this.saveTransactionRepo.save(
        new SaveTransactionDto(
          {
            type: TransactionTypeConstant.DEPOSIT,
            status: 1,
            amount: dto.amount,
            user_id: user.id,
            currency_code: "USD",
            game_provider: GameProviderConstant.ARP_STUDIO
          }
        )
      );

      //save api transaction
      await this.saveArpTransactionRepo.save(new SaveArpTransactionDto({
        main_transaction_id: mainTransaction.id,
        account_type: response.atype,
        trade_no: dto.tradeno,
        source: dto.source
      }));


      return response;
    } catch (e) {
      throw new DepositOperationFailedException(e);
    }
  }
}