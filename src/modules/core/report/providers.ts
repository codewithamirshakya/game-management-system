import {
    GetCasinoDailyReportService,
} from "./application/services/evolution/getCasinoDailyReport.service";
import {GetCasinoGamesReportService} from "./application/services/evolution/getCasinoGamesReport.service";
import {GetCasinoGamesReportv2Service} from "./application/services/evolution/getCasinoGamesReportv2.service";
import {GetPlayersGameReportService} from "./application/services/evolution/getPlayersGameReport.service";
import {GetCasinoDailyReportTipsService} from "./application/services/evolution/getCasinoDailyReportTips.service";
import {GetCasinoTipsService} from "./application/services/evolution/getCasinoTips.service";
import {GetCasinoTipsStreamService} from "./application/services/evolution/getCasinoTipsStream..service";

const VelaGamingProviders = [
];

const EvolutionProviders = [
    GetCasinoDailyReportService,
    GetCasinoGamesReportService,
    GetCasinoGamesReportv2Service,
    GetPlayersGameReportService,
    GetCasinoDailyReportTipsService,
    GetCasinoTipsService,
    GetCasinoTipsStreamService
];

export const Providers = [
    ...EvolutionProviders,
    // ...VelaGamingProviders
];