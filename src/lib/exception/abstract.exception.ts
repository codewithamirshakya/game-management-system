import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { HttpException } from "@nestjs/common";

export class AbstractException extends HttpException{
  public getData() {
    return '';
  }

  public getError() {
    return null;
  }
}