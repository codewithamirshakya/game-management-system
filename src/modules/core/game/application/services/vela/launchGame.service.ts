import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { LaunchGameDto } from "../../dtos/request/vela/launchGame.dto";
import { LaunchGameDto as DomainLaunchGameDTO } from "../../../domain/dto/request/vela/launchGame.dto";
import { LaunchGameRepositoryInterface } from "../../../domain/repository/vela/launchGame.repository.interface";
import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";

export class LaunchGameService {
  constructor(
    @Inject(TYPES.velaRepository.LaunchGameRepositoryInterface)
    private repo: LaunchGameRepositoryInterface,
    private eventEmitter: EventEmitter2
  ) {
  }

  public launch(dto: LaunchGameDto, ip, req) {

    //event dispatch
    this.eventEmitter.emit(
      EventDefinition.ACTIVITY_COMPLETED_EVENT,
      new ActivityCompletedEvent(
        GameProviderConstant.VELA_GAMING,
        ActivityTypeConstant.GAME,
        "[Vela gaming launched with game URL " + dto.gameUrl+ ']',
        ip,
        req.headers["user-agent"]
      ));

    return this.repo.launch(new DomainLaunchGameDTO(dto), dto.gameUrl);
  }
}