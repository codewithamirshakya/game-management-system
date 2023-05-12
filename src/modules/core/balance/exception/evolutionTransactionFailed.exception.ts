import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "@src/lib/exception/abstract.exception";

export class EvolutionTransactionFailedException extends AbstractException{
  private readonly data;
  constructor(message = 'Transaction Failed.',data = null) {
    super(message,HttpStatus.BAD_REQUEST);
    this.data = data;
  }

  getData() {
    return this.data;
  }
}