import { ListGameLobbyService } from "./application/services/arpStudio/listGameLobby.service";
import { GetGameRoadSheetService } from "./application/services/arpStudio/getGameRoadSheet.service";
import { ListGameService } from "./application/services/vela/listGame.service";
import { ListGameService as EvolutionListGameService } from "./application/services/evolution/listGame.service";
import { GetGameReportService } from "./application/services/vela/getGameReport.service";
import { LaunchGameService } from "./application/services/vela/launchGame.service";
import { LaunchLobbyService } from "./application/services/vela/launchLobby.service";
import {GetRenderedResultService} from "./application/services/evolution/getRenderedResult.service";
import {GetRenderedResultByGameIdService} from "./application/services/evolution/getRenderedResultByGameId.service";
import {GetCasinoLobbyStateService} from "./application/services/evolution/getCasinoLobbyState.service";

const VelaGamingProviders = [
  ListGameService,
  GetGameReportService,
  LaunchGameService,
  LaunchLobbyService
];

const EvolutionProviders = [
    ListGameService,
    EvolutionListGameService,
    GetRenderedResultService,
    GetRenderedResultByGameIdService,
    GetCasinoLobbyStateService
];

export const Providers = [
    ListGameLobbyService,
    GetGameRoadSheetService,
    ...EvolutionProviders,
    ...VelaGamingProviders
];