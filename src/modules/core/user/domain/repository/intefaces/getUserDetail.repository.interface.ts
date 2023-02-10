import { DetailUserDto } from "../../dtos/request/arpStudio/detail.user.dto";
import { DetailDto as EvolutionUserDetailDTO } from "../../dtos/request/evolution/detail.dto";

export interface IGetUserDetailRepositoryInterface {
  get(dto: (DetailUserDto | EvolutionUserDetailDTO));
}