import { ListGameLobbyDomainDto } from "../../dto/request/arpStudio/listGameLobby.domain.dto";

export interface ListGameLobbyRepositoryInterface {
  getList(dto:ListGameLobbyDomainDto);
}