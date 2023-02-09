import { GetController } from "../../../../apps/api/vela/balance/get.controller";
import { GetController as ArpStudioGetController} from "../../../../apps/api/arpStudio/balance/get.controller";
import { GetController as EvolutionGetController} from "../../../../apps/api/evolution/balance/get.controller";
import { WithdrawController } from "../../../../apps/api/arpStudio/balance/withdraw.controller";
import { WithdrawController as VelaWithdrawController} from "../../../../apps/api/vela/balance/withdraw.controller";
import { DepositController } from "../../../../apps/api/arpStudio/balance/deposit.controller";
import { DepositController as VelaDepositController} from "../../../../apps/api/vela/balance/deposit.controller";
import { WalletController } from "../../../../apps/api/vela/balance/wallet.controller";
import { RebateController } from "../../../../apps/api/vela/balance/rebate.controller";
import { ListAllRebateTransactionController } from "../../../../apps/api/vela/balance/listAllRebateTransaction.controller";
import { GetRebateWalletBalanceController } from "../../../../apps/api/vela/balance/getRebateWalletBalance.controller";

const ArpStudioControllers = [
  ArpStudioGetController,
  WithdrawController,
  DepositController
];

const Evolution  = [
  EvolutionGetController
];

const VelaGamingControllers = [
  GetController,
  VelaDepositController,
  VelaWithdrawController,
  WalletController,
  RebateController,
  ListAllRebateTransactionController,
  GetRebateWalletBalanceController
];

export const Controllers = [
  ...VelaGamingControllers,
  ...ArpStudioControllers,
  ...Evolution
];