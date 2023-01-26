import { TYPES } from "./application/constants/types";
import { GetBalanceRepository } from "./infrastructure/persistence/repository/arpStudio/getBalance.repository";
import { GetBalanceRepository as GetVelaBalanceRepository } from "./infrastructure/persistence/repository/velaGaming/getBalance.repository";
import {
 WithdrawBalanceRepository
} from "./infrastructure/persistence/repository/arpStudio/withdrawBalance.repository";
import {
 WithdrawBalanceRepository as VelaWithdrawBalanceRepository }
 from "./infrastructure/persistence/repository/velaGaming/withdrawBalance.repository";
import { SaveTransactionRepository } from "./infrastructure/persistence/repository/saveTransaction.repository";
import { SaveTransactionRepository as SaveArpTransactionRepository } from "./infrastructure/persistence/repository/arpStudio/saveTransaction.repository";
import { DepositBalanceRepository } from "./infrastructure/persistence/repository/arpStudio/depositBalance.repository";
import { DepositBalanceRepository as VelaDepositBalanceRepository } from "./infrastructure/persistence/repository/velaGaming/depositBalance.repository";
import {
 SaveVelaTransactionRepository
} from "./infrastructure/persistence/repository/velaGaming/saveVelaTransaction.repository";
import {
 GetWalletBalanceRepository
} from "./infrastructure/persistence/repository/velaGaming/getWalletBalance.repository";


export const DependenciesConstants = [
 { provide: TYPES.repository.GetBalanceRepositoryInterface, useClass: GetBalanceRepository },
 { provide: TYPES.repository.WithdrawBalanceRepositoryInterface, useClass: WithdrawBalanceRepository },
 { provide: TYPES.repository.DepositBalanceRepositoryInterface, useClass: DepositBalanceRepository },
 { provide: TYPES.repository.SaveTransactionRepositoryInterface, useClass: SaveTransactionRepository },
 { provide: TYPES.repository.SaveArpTransactionRepositoryInterface, useClass: SaveArpTransactionRepository },

 //vela gaming providers
 { provide: TYPES.velaRepository.GetBalanceRepositoryInterface, useClass: GetVelaBalanceRepository },
 { provide: TYPES.velaRepository.GetWalletBalanceRepositoryInterface, useClass: GetWalletBalanceRepository },
 { provide: TYPES.velaRepository.DepositBalanceRepositoryInterface, useClass: VelaDepositBalanceRepository },
 { provide: TYPES.velaRepository.WithdrawBalanceRepositoryInterface, useClass: VelaWithdrawBalanceRepository },
 { provide: TYPES.velaRepository.SaveVelaTransactionRepositoryInterface, useClass: SaveVelaTransactionRepository },
];