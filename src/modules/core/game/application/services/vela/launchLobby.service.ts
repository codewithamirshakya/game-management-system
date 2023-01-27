import { EventDefinition } from "../../../../shared/application/constants/eventDefinition";
import { ActivityCompletedEvent } from "../../../../shared/domain/event/activityLog/activityCompleted.event";
import { ActivityTypeConstant } from "../../../../shared/domain/constants/activityType.constant";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { VelaGamingConfig } from "../../../../../../config/velaGaming.config";
import { LaunchLobbyDto } from "../../dtos/request/vela/launchLobby.dto";
import { Injectable } from "@nestjs/common";
import { GameProviderConstant } from "../../../../shared/application/constants/gameProvider.constant";

@Injectable()
export class LaunchLobbyService {
  constructor(
    private eventEmitter: EventEmitter2
  ) {
  }

  public async launch(dto: LaunchLobbyDto, ip, req) {
    //event dispatch
    this.eventEmitter.emit(
      EventDefinition.ACTIVITY_COMPLETED_EVENT,
      new ActivityCompletedEvent(
        GameProviderConstant.VELA_GAMING,
        ActivityTypeConstant.LOBBY,
        "[Vela gaming lobby launched with lobby URL]",
        ip,
        req.headers["user-agent"]
      ));
    return this.generateUrl(dto);
  }

  private async generateUrl(dto: LaunchLobbyDto) {
    const dtoParams = dto as unknown as any;
    const params = new URLSearchParams({
      ...dtoParams,
      host_id: dto.host_id
        ? dto.host_id
        : VelaGamingConfig.operatorId,
    }).toString();
    return VelaGamingConfig.lobbyUrl + '?' + params;
  }
}