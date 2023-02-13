import {UserDetailDto} from "../../../dtos/response/evolution/userDetail.dto";

export interface GetUserByUidRepositoryInterface {
    get(uid: string): Promise<UserDetailDto>;
}