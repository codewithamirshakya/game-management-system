import { TYPES } from "./application/constants/types";
import { GetUserByIdRepository } from "./infrastructure/persistence/getUserById.repository";
import { CreateUserRepository } from "./infrastructure/persistence/create.user.repository";
import {
  CreateUserRepository as CreateARPStudioUserRepository
} from "./infrastructure/persistence/arpStudio/create.user.repository";
import { IsUserExistsRepository } from "./infrastructure/persistence/isUserExists.repository";
import { UpdateLastLoggedAtRepository } from "./infrastructure/persistence/update.lastLoggedAt.repository";
import { UpdateUserRepository } from "./infrastructure/persistence/arpStudio/update.user.repository";

export const DependenciesConstants = [
 { provide: TYPES.repository.IGetUserServiceRepositoryInterface, useClass: GetUserByIdRepository },
  { provide: TYPES.repository.ICreateUserServiceRepositoryInterface, useClass: CreateUserRepository },
 { provide: TYPES.repository.ICreateArpStudioUserRepositoryInterface, useClass: CreateARPStudioUserRepository },
  { provide: TYPES.repository.IsUserExistsRepositoryInterface, useClass: IsUserExistsRepository },
  { provide: TYPES.repository.UpdateLastLoggedAtRepositoryInterface, useClass: UpdateLastLoggedAtRepository },
  { provide: TYPES.repository.UpdateUserRepositoryInterface, useClass: UpdateUserRepository },

];