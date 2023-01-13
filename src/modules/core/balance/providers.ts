import { GetBalanceService } from "./application/services/arpStudio/getBalance.service";
import { WithdrawService } from "./application/services/arpStudio/withdraw.service";
import { DepositService } from "./application/services/arpStudio/deposit.service";

export const Providers = [
    GetBalanceService,
    WithdrawService,
    DepositService
];