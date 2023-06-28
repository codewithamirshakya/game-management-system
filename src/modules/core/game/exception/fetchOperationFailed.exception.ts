import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "@src/lib/exception/abstract.exception";

export class FetchOperationFailedException extends AbstractException{
  private readonly error;
  constructor(error,message= 'Game fetch operation failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}