import { UserDomain } from "../../user.domain";

export interface IGetUserByIdRepositoryInterface {
    getById(id: number): Promise<UserDomain>;
}
