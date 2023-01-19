import { TYPES } from "./application/constants/types";
import {
 GetUserAccountDetailRepository
} from "./infrastructure/persistence/repository/arpStudio/getUserAccountDetail.repository";

export const DependenciesConstants = [
 { provide: TYPES.repository.GetUserAccountDetailRepositoryInterface, useClass: GetUserAccountDetailRepository },
];