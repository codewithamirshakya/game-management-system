// import {TYPES} from "./application/constants/types";
// // import {
// //     ListGameLobbyRepository
// // } from "./infrastructure/persistence/repository/arpStudio/listGameLobby.repository";
// import {
//     GetGameRoadSheetRepository
// } from "./infrastructure/persistence/repository/arpStudio/getGameRoadSheet.repository";
// import {ListGameRepository} from "./infrastructure/persistence/repository/vela/listGame.repository";
// import {
//     ListGameRepository as EvolutionListGameRepository
// } from "./infrastructure/persistence/repository/evolution/listGame.repository";
// import {GetGameReportRepository} from "./infrastructure/persistence/repository/vela/getGameReport.repository";
// import {LaunchGameRepository} from "./infrastructure/persistence/repository/vela/launchGame.repository";
// import {
//     GetResultByTokenRepository
// } from "./infrastructure/persistence/repository/evolution/getResultByToken.repository";
// import {
//     GetResultByGameIdRepository
// } from "./infrastructure/persistence/repository/evolution/getResultByGameId.repository";
// import {GetCasinoStateRepository} from "./infrastructure/persistence/repository/evolution/getCasinoState.repository";

// export const DependenciesConstants = [
//     // arp studio
//     {provide: TYPES.repository.ListGameLobbyRepositoryInterface, useClass: ListGameLobbyRepository},
//     {provide: TYPES.repository.GetGameRoadSheetRepositoryInterface, useClass: GetGameRoadSheetRepository},

//     // vela gaming
//     {provide: TYPES.velaRepository.ListGameRepositoryInterface, useClass: ListGameRepository},
//     {provide: TYPES.velaRepository.GetGameReportRepositoryInterface, useClass: GetGameReportRepository},
//     {provide: TYPES.velaRepository.LaunchGameRepositoryInterface, useClass: LaunchGameRepository},

//     //evolution
//     {provide: TYPES.evolutionRepository.ListGameRepositoryInterface, useClass: EvolutionListGameRepository},
//     {provide: TYPES.evolutionRepository.GetResultByTokenRepositoryInterface, useClass: GetResultByTokenRepository},
//     {provide: TYPES.evolutionRepository.GetResultByGameIdRepositoryInterface, useClass: GetResultByGameIdRepository},
//     {provide: TYPES.evolutionRepository.GetCasinoStateRepositoryInterface, useClass: GetCasinoStateRepository},
// ];