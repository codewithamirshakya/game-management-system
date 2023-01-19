import { TYPES } from "./application/constants/types";
import {
 ListGameLobbyRepository
} from "./infrastructure/persistence/repository/arpStudio/listGameLobby.repository";
import {
 GetGameRoadSheetRepository
} from "./infrastructure/persistence/repository/arpStudio/getGameRoadSheet.repository";

export const DependenciesConstants = [
 { provide: TYPES.repository.ListGameLobbyRepositoryInterface, useClass: ListGameLobbyRepository },
 { provide: TYPES.repository.GetGameRoadSheetRepositoryInterface, useClass: GetGameRoadSheetRepository },
];