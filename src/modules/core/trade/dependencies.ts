import { TYPES } from "./application/constants/types";
import {
 GetUserTradeDetailRepository
} from "./infrastructure/persistence/repository/arpStudio/getUserTradeDetail.repository";


export const DependenciesConstants = [
 { provide: TYPES.repository.GetUserTradeDetailRepositoryInterface, useClass: GetUserTradeDetailRepository },
];