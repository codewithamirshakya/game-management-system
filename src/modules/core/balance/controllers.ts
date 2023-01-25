import { GetController } from "../../../../apps/api/vela/balance/get.controller";
import { GetController as ArpStudioGetController} from "../../../../apps/api/arpStudio/balance/get.controller";
import { WithdrawController } from "../../../../apps/api/arpStudio/balance/withdraw.controller";
import { WithdrawController as VelaWithdrawController} from "../../../../apps/api/vela/balance/withdraw.controller";
import { DepositController } from "../../../../apps/api/arpStudio/balance/deposit.controller";
import { DepositController as VelaDepositController} from "../../../../apps/api/vela/balance/deposit.controller";

const ArpStudioControllers = [
  ArpStudioGetController,
  WithdrawController,
  DepositController
];

const VelaGamingControllers = [
  GetController,
  VelaDepositController,
  VelaWithdrawController
];

export const Controllers = [
  ...VelaGamingControllers,
  ...ArpStudioControllers
];