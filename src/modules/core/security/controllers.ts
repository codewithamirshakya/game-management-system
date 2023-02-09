import { LoginController } from "../../../../apps/api/arpStudio/security/login.controller";
import { LogoutController } from "../../../../apps/api/arpStudio/security/logout.controller";
import { AuthenticateController } from "../../../../apps/api/vela/security/authenticate.controller";
import { UserAuthenticateController } from "../../../../apps/api/evolution/security/userAuthenticate.controller";

const EvolutionControllers = [
  UserAuthenticateController
];

const VelaGamingControllers = [
  AuthenticateController
];

const ArpStudioControllers = [
  LoginController,
  LogoutController,
];

export const Controllers = [
  ...VelaGamingControllers,
  ...ArpStudioControllers,
  ...EvolutionControllers
];