import { CreatePlayerDto } from "../../../dtos/request/vela/createPlayer.dto";

export interface CreatePlayerRepositoryInterface {
  createPlayer(dto: CreatePlayerDto);
}