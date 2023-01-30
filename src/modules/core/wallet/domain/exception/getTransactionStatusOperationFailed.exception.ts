import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "../../../../../lib/exception/abstract.exception";

export class GetTransactionStatusOperationFailedException extends AbstractException{
  private readonly error;
  constructor(error,message= 'Get Wallet Transaction Status operation failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}