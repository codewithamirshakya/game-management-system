import { DetailDto } from "../../../dtos/request/evolution/detail.dto";
import { IGetUserDetailRepositoryInterface } from "../getUserDetail.repository.interface";

export interface GetUserDetailRepositoryInterface extends IGetUserDetailRepositoryInterface{
    get(dto: DetailDto);
}