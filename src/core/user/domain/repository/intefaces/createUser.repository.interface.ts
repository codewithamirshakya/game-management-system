import { UserDomain } from "../../user.domain";

export interface IGetUserRepositoryInterface {
    getById(id: string): Promise<UserDomain>;
}
