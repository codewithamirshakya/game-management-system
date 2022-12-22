import { UserDomain } from "../../user.domain";

export interface ICreateUserRepositoryInterface {
    create(data: any): Promise<UserDomain>;
}
