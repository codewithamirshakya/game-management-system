import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "src/lib/exception/abstract.exception";

export class UserFetchFailedException extends AbstractException{
  private readonly error;
  constructor(error,message = 'User details fetch operation failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}