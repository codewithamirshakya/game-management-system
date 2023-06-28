import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "@src/lib/exception/abstract.exception";

export class GetBalanceExceptionFailed extends AbstractException{
    constructor(message= 'get balance retrival failed.') {
        super(message,HttpStatus.BAD_REQUEST);
  }
}