import { UserDto } from "../../../dtos/response/arpStudio/user.dto";
import { CreateUserDto } from "../../../dtos/request/arpStudio/create.user.dto";

export interface ICreateArpStudioUserRepositoryInterface  {
    create(data: CreateUserDto): Promise<UserDto>;
}
