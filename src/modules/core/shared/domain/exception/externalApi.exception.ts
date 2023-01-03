import { HttpException, HttpStatus } from "@nestjs/common";

export class ExternalApiException extends HttpException{
  constructor(response) {
    super(response,HttpStatus.BAD_REQUEST);
  }

}