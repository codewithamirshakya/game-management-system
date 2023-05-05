import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "src/lib/exception/abstract.exception";

export class UserCreationFailedException extends AbstractException{
  private readonly error;
  constructor(error,message= 'User Create retrieve operation failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}