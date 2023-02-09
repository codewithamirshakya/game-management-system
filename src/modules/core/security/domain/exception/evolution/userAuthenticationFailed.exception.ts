import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "../../../../../../lib/exception/abstract.exception";

export class UserAuthenticationFailedException extends AbstractException{
  private readonly error;
  constructor(error,message = 'User Authentication Failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}