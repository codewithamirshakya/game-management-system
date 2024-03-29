import { DataTransferObject } from "@src/lib/dto/dataTransferObject";

export interface WithDrawBalance extends DataTransferObject{

  readonly notifyid: string;

  readonly username: string;

  readonly atype: number;

  readonly tradeno?: number;

  readonly amount: number;

  readonly currenttime?: number;

  readonly source: string;
}