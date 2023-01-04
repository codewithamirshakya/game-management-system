import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "../../../../../lib/exception/abstract.exception";

export class LoginFailedException extends AbstractException{
  private readonly error;
  constructor(message,error) {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}