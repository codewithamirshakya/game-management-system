import { QueryBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import {GetEvolutionUserQuery} from "../../../../../shared/domain/query/user/GetEvolutionUserQuery";


@Injectable()
export class IsUserExistsValidationService {
  constructor(
    private queryBus: QueryBus
  ) {}
  public async isUserExists(uid: string) {
    return await this.queryBus.execute(new GetEvolutionUserQuery(uid));
  }
}