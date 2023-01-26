import { AuthenticateDto } from "../../dto/request/vela/authenticate.dto";

export interface AuthenticateRepositoryInterface {
  authenticate(dto: AuthenticateDto);
}