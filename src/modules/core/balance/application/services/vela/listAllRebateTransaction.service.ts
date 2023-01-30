import {
  ListAllRebateTransactionDto as DomainListAllRebateTransactionDTO
} from "../../../domain/dto/request/vela/listAllRebateTransaction.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
  ListAllRebateTransactionRepositoryInterface
} from "../../../domain/repository/velaGaming/listAllRebateTransaction.repository.interface";
import { ListAllRebateTransactionDto } from "../../dtos/request/vela/listAllRebateTransaction.dto";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { IsUserExistsValidationService } from "../validation/IsUserExistsValidation.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class ListAllRebateTransactionService {
  constructor(
    @Inject(TYPES.velaRepository.ListAllRebateTransactionRepositoryInterface) private repo: ListAllRebateTransactionRepositoryInterface,
    private userExistsValidationService: IsUserExistsValidationService,
    private eventEmitter: EventEmitter2
  ) {
  }


  public async listAll(dto: ListAllRebateTransactionDto, req, ip) {
    // validation
    let user;
    if (dto.member_id) {
      user = await this.userExistsValidationService.isUserExists(dto.member_id, GameProviderConstant.VELA_GAMING);
    }
    try {
      const response = this.repo.listAll(new DomainListAllRebateTransactionDTO(dto));
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
        "[All rebate transactions fetched successfully.]",
        ip,
        req.headers["user-agent"],
        userId
      ));
  }
}