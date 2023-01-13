export class WithdrawBalanceDto {
  readonly appid: string;

  readonly notifyid: string;

  readonly username: string;

  readonly atype: number;

  readonly tradeno?: number;

  readonly amount: number;

  readonly currenttime?: number;

  readonly source: number;
}