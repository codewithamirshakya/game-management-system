import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "@src/lib/exception/abstract.exception";

export class UserUpdateFailedException extends AbstractException{
  private readonly error;
  constructor(message,error) {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}