import { ListController } from "../../../../apps/api/vela/game/list.controller";
import { ListController as GameLobbyListController } from "../../../../apps/api/arpStudio/game/lobby/list.controller";
import { GetController } from "../../../../apps/api/arpStudio/game/roadsheet/get.controller";
import { ReportController as VelaGameReportController } from "../../../../apps/api/vela/game/report.controller";

const ArpStudioControllers = [
  GameLobbyListController,
  GetController
];

const VelaGamingControllers = [
  ListController,
  VelaGameReportController
];

export const Controllers = [
  ...VelaGamingControllers,
  ...ArpStudioControllers
];