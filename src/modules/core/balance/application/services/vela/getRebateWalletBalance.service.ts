import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { IsUserExistsValidationService } from "../validation/IsUserExistsValidation.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GetRebateWalletBalanceDto } from "../../dtos/request/vela/getRebateWalletBalance.dto";
import {
  GetRebateWalletBalanceRepositoryInterface
} from "../../../domain/repository/velaGaming/getRebateWalletBalance.repository.interface";
import { GetRebateWalletDto } from "../../../domain/dto/request/vela/getRebateWallet.dto";

export class GetRebateWalletBalanceService {
  constructor(
    @Inject(TYPES.velaRepository.GetRebateWalletBalanceRepositoryInterface) private repo: GetRebateWalletBalanceRepositoryInterface,
    private userExistsValidationService: IsUserExistsValidationService,
    private eventEmitter: EventEmitter2
  ) {
  }


  public async get(dto: GetRebateWalletBalanceDto, req, ip) {
    // validation
    let user;
    if (dto.member_id) {
      user = await this.userExistsValidationService.isUserExists(dto.member_id, GameProviderConstant.VELA_GAMING);
    }
    try {
      const response = this.repo.get(new GetRebateWalletDto(dto));
      this.dispatchPostEvent(req, ip, user ? user.id : null);
      return response;
    } catch (e) {
      throw e;
    }
  }

  public dispatchPostEvent(req, ip, userId) {
    //event dispatch
    this.eventEmitter.emit(
      EventDefinition.ACTIVITY_COMPLETED_EVENT,
      new ActivityCompletedEvent(
        GameProviderConstant.VELA_GAMING,
        ActivityTypeConstant.REBATE,
        "[Player rebate wallet balance fetched successfully.]",
        ip,
        req.headers["user-agent"],
        userId
      ));
  }
}