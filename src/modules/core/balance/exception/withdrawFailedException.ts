import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "src/lib/exception/abstract.exception";

export class WithDrawExceptionFailed extends AbstractException{
  constructor(message = 'Withdraw failed.') {
    super(message,HttpStatus.BAD_REQUEST);
  }
}