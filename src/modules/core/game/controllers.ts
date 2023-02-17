import {ListController} from "../../../../apps/api/vela/game/list.controller";
import {ListController as EvolutionGameListController} from "../../../../apps/api/evolution/game/list.controller";
import {ListController as EvolutionBetsListController} from "../../../../apps/api/evolution/bets/list.controller";
import {ListController as GameLobbyListController} from "../../../../apps/api/arpStudio/game/lobby/list.controller";
import {GetController} from "../../../../apps/api/arpStudio/game/roadsheet/get.controller";
import {ReportController as VelaGameReportController} from "../../../../apps/api/vela/game/report.controller";
import {LaunchController} from "../../../../apps/api/vela/game/launch.controller";
import {LaunchController as LaunchLobbyController} from "../../../../apps/api/vela/lobby/launch.controller";
import {GetGameRenderedByTokenController} from "../../../../apps/api/evolution/game/getGameRenderedByToken.controller";
import {
    GetGameRenderedByGameIdController
} from "../../../../apps/api/evolution/game/getGameRenderedByGameId.controller";
import {GetCasinoLobbyStateController} from "../../../../apps/api/evolution/game/getCasinoLobbyState.controller";

const ArpStudioControllers = [
    GameLobbyListController,
    GetController
];

const VelaGamingControllers = [
    ListController,
    VelaGameReportController,
    LaunchController,
    LaunchLobbyController
];

const EvolutionControllers = [
    EvolutionGameListController,
    EvolutionBetsListController,
    GetGameRenderedByTokenController,
    GetGameRenderedByGameIdController,
    GetCasinoLobbyStateController
];

export const Controllers = [
    ...VelaGamingControllers,
    ...ArpStudioControllers,
    ...EvolutionControllers
];