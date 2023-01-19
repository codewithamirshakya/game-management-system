import { TYPES } from "./application/constants/types";
import {
 GetUserBetDetailRepository
} from "./infrastructure/persistence/repository/arpStudio/getUserBetDetail.repository";

export const DependenciesConstants = [
 { provide: TYPES.repository.GetUserBetDetailRepositoryInterface, useClass: GetUserBetDetailRepository },
];