import {  HttpStatus } from "@nestjs/common";
// import { AbstractException } from "../../../../../lib/exception/abstract.exception";
import { AbstractException } from "../../../../lib/exception/abstract.exception";

export class ExternalApiException extends AbstractException{
  private readonly data;
  constructor(message,data = null) {
    super(message,HttpStatus.BAD_REQUEST);
    this.data = data;
  }

  getData() {
    return this.data;
  }
}