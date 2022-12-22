import { UserDomain } from "../../../domain/user.domain";

export interface IGetUserApplicationServiceInterface {
    getById(id: string): Promise<UserDomain>;
}
