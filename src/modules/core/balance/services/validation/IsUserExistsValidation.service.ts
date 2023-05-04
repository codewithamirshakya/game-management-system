import { QueryBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { GetUserQuery } from "src/modules/core/shared/domain/query/user/GetUserQuery";


@Injectable()
export class IsUserExistsValidationService {
  constructor(
    private queryBus: QueryBus
  ) {}
  public async isUserExists(username: string, gamingProvider: number) {
    return await this.queryBus.execute(new GetUserQuery(username,
      gamingProvider));
  }
}