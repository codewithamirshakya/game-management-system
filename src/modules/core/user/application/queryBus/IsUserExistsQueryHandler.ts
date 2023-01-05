import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IsUserExistsQuery } from "../../../shared/domain/query/user/IsUserExistsQuery";
import { Inject } from "@nestjs/common";
import { TYPES } from "../constants/types";
import { IsUserExistsRepositoryInterface } from "../../domain/repository/intefaces/isUserExists.repository.interface";

@QueryHandler(IsUserExistsQuery)
export class IsUserExistsQueryHandler implements IQueryHandler<IsUserExistsQuery> {

  constructor(
    @Inject(TYPES.repository.IsUserExistsRepositoryInterface) private repo: IsUserExistsRepositoryInterface,
  ) {}

  async execute(query: IsUserExistsQuery): Promise<Boolean> {
    return await this.repo.isUserExists(query.username, query.gameProvider);
  }

}
