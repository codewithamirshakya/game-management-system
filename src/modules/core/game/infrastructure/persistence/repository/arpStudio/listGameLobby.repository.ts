import { Inject } from "@nestjs/common";
import { ArpStudioRequestService } from "../../../../../shared/application/service/arpStudio.request.service";
import { ArpStudioRequestDto } from "../../../../../shared/application/dto/arpStudio.request.dto";
import { ListGameLobbyDomainDto } from "../../../../domain/dto/request/arpStudio/listGameLobby.domain.dto";
import {
  ListGameLobbyRepositoryInterface
} from "../../../../domain/repository/arpStudio/listGameLobby.repository.interface";


export class ListGameLobbyRepository implements ListGameLobbyRepositoryInterface{
  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  getList(dto: ListGameLobbyDomainDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'GET',
      params: dto,
      endpoint: '/client/game/lobby'
    }));
  }
}