import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { Transactional } from "typeorm-transactional";
import { SaveTransactionRepositoryInterface } from "../../../domain/repository/saveTransaction.repository.interface";
import { TransactionTypeConstant } from "../../../domain/constants/transactionType.constant";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { SaveTransactionDto } from "../../../domain/dto/request/saveTransaction.dto";
import { IsUserExistsValidationService } from "../validation/IsUserExistsValidation.service";
import { RebateBalanceDto } from "../../dtos/request/vela/rebateBalance.dto";
import {
  RebateBalanceRepositoryInterface
} from "../../../domain/repository/velaGaming/rebateBalance.repository.interface";
import { RebateBalanceDto as DomainRebateBalanceDto } from "../../../domain/dto/request/vela/rebateBalance.dto";
import { RebateOperationFailedException } from "../../../domain/exception/rebateOperationFailed.exception";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class RebateBalanceService {
  constructor(
    @Inject(TYPES.velaRepository.RebateBalanceRepositoryInterface) private repo: RebateBalanceRepositoryInterface,
    @Inject(TYPES.repository.SaveTransactionRepositoryInterface) private saveTransactionRepo: SaveTransactionRepositoryInterface,
    private userExistsValidationService: IsUserExistsValidationService,
    private eventEmitter: EventEmitter2
  ) {
  }

  @Transactional()
  public async rebateBalance(dto: RebateBalanceDto,req, ip) {
    // validation
    const user = await this.userExistsValidationService.isUserExists(dto.member_id,GameProviderConstant.VELA_GAMING);
    try {
      const response = await this.repo.rebate(new DomainRebateBalanceDto(dto));

      // save main transaction table
      const mainTransaction = await this.saveTransactionRepo.save(
        new SaveTransactionDto(
          {
            type: TransactionTypeConstant.REBATE,
            status: 1,
            amount: dto.amount,
            user_id: user.id,
            currency_code: "PHP",
            game_provider: GameProviderConstant.VELA_GAMING
          }
        )
      );

      // //save vela transaction
      // await this.saveVelaTransactionRepo.save(new SaveVelaTransactionDto({
      //   main_transaction_id: mainTransaction.id,
      //   trans_id: dto.transid,
      //   available_balance: response.balance,
      //   vg_transaction_id: response.vg_transaction_id,
      //   vg_transaction_time: response.vg_transaction_time
      // }));

      this.dispatchPostEvent(req,ip,user.id);
      return response;
    } catch (e) {
      throw new RebateOperationFailedException(e);
    }
  }

  public dispatchPostEvent(req,ip,userId){
    //event dispatch
    this.eventEmitter.emit(
      EventDefinition.ACTIVITY_COMPLETED_EVENT,
      new ActivityCompletedEvent(
        GameProviderConstant.VELA_GAMING,
        ActivityTypeConstant.REBATE,
        "[Claim Rebate request completed.]",
        ip,
        req.headers["user-agent"],
        userId
      ));
  }
}