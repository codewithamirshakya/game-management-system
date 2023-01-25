import { GetUserService } from "./application/services/getUser.service";
import { UpdateUserService } from "./application/services/arpStudio/update.user.service";
import { GetUserDetailService } from "./application/services/arpStudio/getUser.detail.service";
import { CreateUserCommandHandler } from "./application/commandBus/create.user.command.handler";
import { IsUserExistsQueryHandler } from "./application/queryBus/IsUserExistsQueryHandler";
import { UpdateLastLoggedAtCommandHandler } from "./application/commandBus/updateLastLoggedAt.command.handler";
import { CreatePlayerService } from "./application/services/vela/createPlayer.service";
import { GetUserQueryHandler } from "./application/queryBus/GetUserQueryHandler";

const ArpStudioProviders = [
  GetUserService,
  UpdateUserService,
  GetUserDetailService,
  CreateUserCommandHandler,
  IsUserExistsQueryHandler,
  GetUserQueryHandler,
  UpdateLastLoggedAtCommandHandler
];

const VelaGamingProviders = [
  CreatePlayerService
];

export const Providers = [
  ...ArpStudioProviders,
  ...VelaGamingProviders
];