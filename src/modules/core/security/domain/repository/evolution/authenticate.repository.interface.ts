import { AuthenticateDto } from "../../dto/request/evolution/authenticate.dto";

export interface AuthenticateRepositoryInterface {
  authenticate(dto: AuthenticateDto);
}