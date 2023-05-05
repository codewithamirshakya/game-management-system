import {  HttpStatus } from "@nestjs/common";
import { AbstractException } from "src/lib/exception/abstract.exception";

export class UserAlreadyExistsException extends AbstractException{
  constructor(message= 'User already exists.') {
    super(message,HttpStatus.BAD_REQUEST);
  }
}