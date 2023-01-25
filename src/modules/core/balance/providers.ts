import { GetBalanceService } from "./application/services/arpStudio/getBalance.service";
import { GetBalanceService as VelaGetBalanceService } from "./application/services/vela/getBalance.service";
import { WithdrawService } from "./application/services/arpStudio/withdraw.service";
import { WithdrawBalanceService as VelaWithdrawService } from "./application/services/vela/withdrawBalance.service";
import { DepositService } from "./application/services/arpStudio/deposit.service";
import { DepositBalanceService as  VelaDepositService} from "./application/services/vela/depositBalance.service";
import { IsUserExistsValidationService } from "./application/services/validation/IsUserExistsValidation.service";

const VelaGamingProviders = [
    VelaGetBalanceService,
    VelaDepositService,
    VelaWithdrawService
];

const ArpStudioProviders =[
    GetBalanceService,
    WithdrawService,
    DepositService,
];

export const Providers = [
    ...ArpStudioProviders,
    ...VelaGamingProviders,
    IsUserExistsValidationService,
];