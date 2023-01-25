import { DetailController } from "../../../../apps/api/arpStudio/user/detail.controller";
import { UpdateController } from "../../../../apps/api/arpStudio/user/update.controller";
import { CreateController } from "../../../../apps/api/vela/user/create.controller";

const ArpStudioControllers = [
  DetailController, UpdateController
];

const VelaGamingControllers = [
  CreateController
];

export const Controllers = [
  ...VelaGamingControllers,
  ...ArpStudioControllers
];