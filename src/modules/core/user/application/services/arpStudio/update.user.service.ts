import { UpdateUserDto } from "../../dtos/request/arpStudio/update.user.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
  UpdateUserRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/update.user.repository.interface";
import { UserUpdateFailedException } from "../../../domain/exception/userUpdateFailed.exception";
import { Transactional } from "typeorm-transactional";
import { Request } from "express";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { SHARED_TYPES } from "../../../../../shared/application/constants/types";
import { EventDispatcherInterface } from "../../../../../shared/application/EventBus/eventDispatcher.interface";

export class UpdateUserService {
  constructor(
    @Inject(TYPES.repository.UpdateUserRepositoryInterface) private repo: UpdateUserRepositoryInterface,
    @Inject(SHARED_TYPES.eventBus.EventDispatcherInterface) private eventDispatcher: EventDispatcherInterface,
  ) {}

  @Transactional()
  public async update(updateUserDTO: UpdateUserDto,req: Request,ip: string) {
    try {
      const response = await this.repo.update(updateUserDTO);
      //activity completed event dispatch
      this.eventDispatcher.dispatch(EventDefinition.ACTIVITY_COMPLETED_EVENT,
        new ActivityCompletedEvent(
          GameProviderConstant.ARP_STUDIO,
          ActivityTypeConstant.USER,
          "[User Updated successfully.]",
          ip,
          req.headers["user-agent"],
        ));
      return response;
    } catch (e) {
      throw new UserUpdateFailedException('User update Failed.',e)
    }
  }
}