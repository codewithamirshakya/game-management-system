import { TYPES } from "./application/constants/types";
import { GetBalanceRepository } from "./infrastructure/persistence/repository/arpStudio/getBalance.repository";
import {
 WithdrawBalanceRepository
} from "./infrastructure/persistence/repository/arpStudio/withdrawBalance.repository";
import { SaveTransactionRepository } from "./infrastructure/persistence/repository/saveTransaction.repository";
import { SaveTransactionRepository as SaveArpTransactionRepository } from "./infrastructure/persistence/repository/arpStudio/saveTransaction.repository";
import { DepositBalanceRepository } from "./infrastructure/persistence/repository/arpStudio/depositBalance.repository";


export const DependenciesConstants = [
 { provide: TYPES.repository.GetBalanceRepositoryInterface, useClass: GetBalanceRepository },
 { provide: TYPES.repository.WithdrawBalanceRepositoryInterface, useClass: WithdrawBalanceRepository },
 { provide: TYPES.repository.DepositBalanceRepositoryInterface, useClass: DepositBalanceRepository },
 { provide: TYPES.repository.SaveTransactionRepositoryInterface, useClass: SaveTransactionRepository },
 { provide: TYPES.repository.SaveArpTransactionRepositoryInterface, useClass: SaveArpTransactionRepository },
];