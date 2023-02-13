import { AuthenticateDto } from "../../dto/request/evolution/authenticate.dto";
import { AuthenticateDto as ResponseAuthenticateDTO} from "../../dto/response/evolution/authenticate.dto";

export interface AuthenticateRepositoryInterface {
  authenticate(dto: AuthenticateDto): Promise<ResponseAuthenticateDTO>;
}