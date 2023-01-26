import { LaunchGameDto } from "../../../../domain/dto/request/vela/launchGame.dto";
import { LaunchGameRepositoryInterface } from "../../../../domain/repository/vela/launchGame.repository.interface";
import { VelaGamingConfig } from "../../../../../../../config/velaGaming.config";

export class LaunchGameRepository implements LaunchGameRepositoryInterface{
  launch(dto: LaunchGameDto, gameUrl: string) {
    const dtoParams = dto as unknown as any;
    const params = new URLSearchParams({
      ...dtoParams,
      host_id: dto.host_id
        ? dto.host_id
        : VelaGamingConfig.operatorId,
    }).toString();
    return gameUrl + '?' + params;
  }
}