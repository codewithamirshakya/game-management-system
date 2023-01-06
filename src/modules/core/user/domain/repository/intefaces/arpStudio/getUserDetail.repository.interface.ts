import { DetailUserDto } from "../../../dtos/request/arpStudio/detail.user.dto";
import { IGetUserDetailRepositoryInterface } from "../getUserDetail.repository.interface";

export interface GetUserDetailRepositoryInterface extends IGetUserDetailRepositoryInterface{
    get(dto: DetailUserDto);
}