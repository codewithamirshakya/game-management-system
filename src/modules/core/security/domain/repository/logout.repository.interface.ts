import { LogoutArpStudioDto } from "../dto/request/logout.arpStudio.dto";

export interface LogoutRepositoryInterface {
  arpStudioLogout(dto: LogoutArpStudioDto);
}