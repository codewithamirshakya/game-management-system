import { ListGameLobbyService } from "./application/services/arpStudio/listGameLobby.service";
import { GetGameRoadSheetService } from "./application/services/arpStudio/getGameRoadSheet.service";
import { ListGameService } from "./application/services/vela/listGame.service";
import { GetGameReportService } from "./application/services/vela/getGameReport.service";
import { LaunchGameService } from "./application/services/vela/launchGame.service";

const VelaGamingProviders = [
  ListGameService,
  GetGameReportService,
  LaunchGameService
];
export const Providers = [
    ListGameLobbyService,
    GetGameRoadSheetService,
    ...VelaGamingProviders
];