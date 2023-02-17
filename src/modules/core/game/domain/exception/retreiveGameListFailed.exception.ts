import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "../../../../../lib/exception/abstract.exception";

export class RetreiveGameListFailedException extends AbstractException{
  private readonly error;
  constructor(error,message= 'Game list fetch operation failed.') {
    super(message,HttpStatus.BAD_REQUEST);
    this.error = error;
  }

  getError() {
    return this.error;
  }
}