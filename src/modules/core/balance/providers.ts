import { GetBalanceService } from "./application/services/arpStudio/getBalance.service";
import { GetBalanceService as VelaGetBalanceService } from "./application/services/vela/getBalance.service";
import { GetBalanceService as EvolutionGetBalanceService } from "./application/services/evolution/getBalance.service";
import { WithdrawService } from "./application/services/arpStudio/withdraw.service";
import { WithdrawBalanceService as VelaWithdrawService } from "./application/services/vela/withdrawBalance.service";
import { DepositService } from "./application/services/arpStudio/deposit.service";
import { DepositBalanceService as  VelaDepositService} from "./application/services/vela/depositBalance.service";
import { IsUserExistsValidationService } from "./application/services/validation/IsUserExistsValidation.service";
import { GetWalletBalanceService } from "./application/services/vela/getWalletBalance.service";
import { RebateBalanceService } from "./application/services/vela/rebateBalance.service";
import { ListAllRebateTransactionService } from "./application/services/vela/listAllRebateTransaction.service";
import { GetRebateWalletBalanceService } from "./application/services/vela/getRebateWalletBalance.service";

const VelaGamingProviders = [
    VelaGetBalanceService,
    VelaDepositService,
    VelaWithdrawService,
    GetWalletBalanceService,
    RebateBalanceService,
    ListAllRebateTransactionService,
    GetRebateWalletBalanceService
];

const ArpStudioProviders =[
    GetBalanceService,
    WithdrawService,
    DepositService,
];

const EvolutionProviders =[
    EvolutionGetBalanceService
];

export const Providers = [
    ...ArpStudioProviders,
    ...VelaGamingProviders,
    ...EvolutionProviders,
    IsUserExistsValidationService,
];