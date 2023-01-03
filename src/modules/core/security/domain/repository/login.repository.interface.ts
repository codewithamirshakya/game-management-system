import { LoginArpStudioDto } from "../dto/request/login.arpStudio.dto";

export interface LoginRepositoryInterface {
  arpSlotLogin(dto: LoginArpStudioDto);
}