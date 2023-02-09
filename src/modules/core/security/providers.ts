import { LoginService } from "./application/services/arpStudio/login.service";
import { AuthenticateService } from "./application/services/vela/authenticate.service";
import { AuthenticateService as EvolutionAuthenticateService} from "./application/services/evolution/authenticate.service";
import { LogoutService } from "./application/services/arpStudio/logout.service";

const ArpStudioProviders = [
  LoginService,
  LogoutService
];

const VelaGamingProviders = [
  AuthenticateService
];

const EvolutionGamingProviders = [
  EvolutionAuthenticateService
];

export const Providers = [
  ...ArpStudioProviders,
  ...VelaGamingProviders,
  ...EvolutionGamingProviders
];