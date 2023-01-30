import { TYPES } from "./application/constants/types";
import {
 GetTransactionStatusRepository
} from "./infrastructure/persistence/repository/velaGaming/getTransactionStatus.repository";


export const DependenciesConstants = [
 //vela gaming providers
 { provide: TYPES.velaRepository.GetTransactionStatusRepositoryInterface, useClass: GetTransactionStatusRepository },
];