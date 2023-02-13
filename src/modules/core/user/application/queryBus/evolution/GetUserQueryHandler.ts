import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {GetEvolutionUserQuery} from "../../../../shared/domain/query/user/GetEvolutionUserQuery";
import {
  GetUserByUidRepositoryInterface
} from "../../../domain/repository/intefaces/evolution/getUser.repository.interface";
import {TYPES} from "../../constants/types";

@QueryHandler(GetEvolutionUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetEvolutionUserQuery> {
  constructor(
    @Inject(TYPES.evolutionRepository.GetUserByUidRepositoryInterface) private repo: GetUserByUidRepositoryInterface,
  ) {}

  async execute(query: GetEvolutionUserQuery): Promise<any> {
    return await this.repo.get(query.uid);
  }

}
