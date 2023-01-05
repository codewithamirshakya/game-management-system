import { UpdateUserDto } from "../../dtos/request/arpStudio/update.user.dto";

export interface IUpdateUserRepositoryInterface {
  update(dto: (UpdateUserDto));
}