import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetUserQuery } from "../../../shared/domain/query/user/GetUserQuery";

@Injectable()
export class UserLoginValidationService {

  constructor(private queryBus: QueryBus) {}

  async validateUser(username:string, pass: string) {
    const user = this.queryBus.execute(new GetUserQuery(username));
  }

}