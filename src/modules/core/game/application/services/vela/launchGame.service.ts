import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { LaunchGameDto } from "../../dtos/request/vela/launchGame.dto";
import { LaunchGameDto as DomainLaunchGameDTO } from "../../../domain/dto/request/vela/launchGame.dto";
import { LaunchGameRepositoryInterface } from "../../../domain/repository/vela/launchGame.repository.interface";

export class LaunchGameService {
    constructor(
      @Inject(TYPES.velaRepository.LaunchGameRepositoryInterface)
      private repo: LaunchGameRepositoryInterface,
    ) {}

    public launch(dto: LaunchGameDto) {
        return this.repo.launch(new DomainLaunchGameDTO(dto), dto.gameUrl);
    }
}