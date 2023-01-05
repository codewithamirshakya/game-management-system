import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "../../../../../lib/exception/abstract.exception";

export class UserNotFoundException extends AbstractException{
  constructor(message = 'User not found.') {
    super(message,HttpStatus.BAD_REQUEST);
  }
}