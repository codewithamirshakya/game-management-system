import {DailyReportController} from "../../../../apps/api/evolution/report/casino/dailyReport.controller";
import {GamesController} from "../../../../apps/api/evolution/report/casino/games.controller";
import {GamesStreamController} from "../../../../apps/api/evolution/report/casino/gamesStream.controller";
import {
    GetPlayersGamesReportController
} from "../../../../apps/api/evolution/report/casino/getPlayersGamesReport.controller";
import {DailyReportTipsController} from "../../../../apps/api/evolution/report/casino/dailyReportTips.controller";
import {GetTipsController} from "../../../../apps/api/evolution/report/casino/getTips.controller";
import {GetTipsStreamController} from "../../../../apps/api/evolution/report/casino/getTipsStream.controller";

const ArpStudioControllers = [
];

const VelaGamingControllers = [
];

const EvolutionControllers = [
    DailyReportController,
    GamesController,
    GamesStreamController,
    GetPlayersGamesReportController,
    DailyReportTipsController,
    GetTipsController,
    GetTipsStreamController
];

export const Controllers = [
    ...EvolutionControllers
];