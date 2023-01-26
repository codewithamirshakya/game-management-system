import { LaunchGameDto } from "../../dto/request/vela/launchGame.dto";

export interface LaunchGameRepositoryInterface {
  launch(dto: LaunchGameDto, gameUrl: string);
}