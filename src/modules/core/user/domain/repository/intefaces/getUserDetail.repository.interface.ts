import { DetailUserDto } from "../../dtos/request/arpStudio/detail.user.dto";

export interface IGetUserDetailRepositoryInterface {
  get(dto: (DetailUserDto));
}