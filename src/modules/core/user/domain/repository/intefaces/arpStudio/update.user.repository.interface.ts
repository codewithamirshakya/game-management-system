import { UpdateUserDto } from "../../../dtos/request/arpStudio/update.user.dto";
import { IUpdateUserRepositoryInterface } from '../update.user.repository.interface';

export interface UpdateUserRepositoryInterface extends IUpdateUserRepositoryInterface{
    update(updateUserDto: UpdateUserDto);
}