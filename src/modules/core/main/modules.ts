import { TradeModule } from "../trade/trade.module";
import { UsersModule } from "../user/users.module";
import { SharedModule } from "../../shared/shared.module";
import { SecurityModule } from "../security/security.module";
import { ApiLogModule } from "../apiLog/apiLog.module";
import { CqrsModule } from "@nestjs/cqrs";
import { BalanceModule } from "../balance/balance.module";
import { BetModule } from "../bet/bet.module";
import { AccountModule } from "../account/account.module";
import { GameModule } from "../game/game.module";
import { ActivityLogModule } from "../activityLog/activityLog.module";
import { RebateModule } from "../rebate/rebate.module";
import { WalletModule } from "../wallet/wallet.module";
import {ReportModule} from "../report/report.module";
import { CommonShareModule } from "../common/common.module";

export const modules = [
  TradeModule,
  UsersModule,
  SharedModule,
  SecurityModule,
  ApiLogModule,
  CqrsModule,
  BalanceModule,
  BetModule,
  AccountModule,
  GameModule,
  ActivityLogModule,
  RebateModule,
  WalletModule,
  ReportModule,
  CommonShareModule
]