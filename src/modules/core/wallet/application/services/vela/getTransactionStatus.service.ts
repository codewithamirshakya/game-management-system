import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { Transactional } from "typeorm-transactional";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GetTransactionStatusDto } from "../../dtos/request/vela/getTransactionStatus.dto";
import { GetTransactionStatusDto as DomainGetTransactionStatusDTO} from "../../../domain/dtos/request/vela/getTransactionStatusDto";
import {
  GetTransactionStatusRepositoryInterface
} from "../../../domain/repository/velaGaming/getTransactionStatus.repository.interface";
import {
  GetTransactionStatusOperationFailedException
} from "../../../domain/exception/getTransactionStatusOperationFailed.exception";

export class GetTransactionStatusService {
  constructor(
    @Inject(TYPES.velaRepository.GetTransactionStatusRepositoryInterface) private repo: GetTransactionStatusRepositoryInterface,
    private eventEmitter: EventEmitter2
  ) {
  }

  @Transactional()
  public async getTransactionStatus(dto: GetTransactionStatusDto,req, ip) {
    // validation
    try {
      const response = await this.repo.getTransactionStatus(new DomainGetTransactionStatusDTO(dto));
      this.dispatchPostEvent(req,ip);
      return response;
    } catch (e) {
      throw new GetTransactionStatusOperationFailedException(e);
    }
  }

  public dispatchPostEvent(req,ip){
    //event dispatch
    this.eventEmitter.emit(
      EventDefinition.ACTIVITY_COMPLETED_EVENT,
      new ActivityCompletedEvent(
        GameProviderConstant.VELA_GAMING,
        ActivityTypeConstant.WALLET,
        "[Wallet Transaction status fetched successfully.]",
        ip,
        req.headers["user-agent"],
      ));
  }
}