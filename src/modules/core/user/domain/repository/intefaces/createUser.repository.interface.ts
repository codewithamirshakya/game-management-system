import { UserDomain } from "../../user.domain";
import { CreateUserDto } from "../../dtos/request/create.user.dto";

export interface ICreateUserRepositoryInterface {
    create(data: CreateUserDto): Promise<UserDomain>;
}
