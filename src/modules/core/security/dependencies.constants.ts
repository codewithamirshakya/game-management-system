import { TYPES } from "./application/constants/types";
import { LoginRepository } from "./infrastructure/persistence/repository/login.repository";
import { LogoutRepository } from "./infrastructure/persistence/repository/logout.repository";
import { AuthenticateRepository } from "./infrastructure/persistence/repository/vela/authenticate.repository";
import { AuthenticateRepository as EvolutionGamingAuthenticateRepository } from "./infrastructure/persistence/repository/evolution/authenticate.repository";

export const DependenciesConstants = [
  // arp studio provider
  {
    provide: TYPES.repository.LoginRepositoryInterface,
    useClass: LoginRepository
  },
  { provide: TYPES.repository.LogoutRepositoryInterface, useClass: LogoutRepository },

  //vela gaming provider
  { provide: TYPES.velaRepository.AuthenticateRepositoryInterface, useClass: AuthenticateRepository },

  //evolution gaming provider
  { provide: TYPES.evolutionRepository.AuthenticateRepositoryInterface, useClass: EvolutionGamingAuthenticateRepository }

];