import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: 'emailId', async: true })
@Injectable()
export class GameProviderValidation implements ValidatorConstraintInterface {

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    console.log(value,args);
    return false;
  }
  defaultMessage(args: ValidationArguments) {
    return `Email already exist`;
  }
}

export function GameProviderCheck(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: GameProviderValidation,
    });
  };
}