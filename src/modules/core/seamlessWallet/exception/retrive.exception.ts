import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "@src/lib/exception/abstract.exception";

export class RetreiveFailedException extends AbstractException{
  private readonly error;
  constructor(error,message= 'Test data fetch operation failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}