import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "../../../../../lib/exception/abstract.exception";

export class UnknownGamingProviderException extends AbstractException{
  private readonly data;
  constructor(message = 'Unknown gaming provider.',data = null,status=HttpStatus.BAD_REQUEST) {
    super(message,status);
    this.data = data;
  }

  getData() {
    return this.data;
  }
}