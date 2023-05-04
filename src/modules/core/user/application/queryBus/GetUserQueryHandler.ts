// import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
// import { GetUserQuery } from "src/modules/core/shared/domain/query/user/GetUserQuery";
// import { Inject } from "@nestjs/common";
// import { TYPES } from "../constants/types";
// import { IGetUserRepositoryInterface } from "../../domain/repository/intefaces/getUser.repository.interface";

// @QueryHandler(GetUserQuery)
// export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
//   constructor(
//     @Inject(TYPES.repository.IGetUserServiceRepositoryInterface) private repo: IGetUserRepositoryInterface,
//   ) {}

//   async execute(query: GetUserQuery): Promise<any> {
//     return await this.repo.getByUserNameAndGameProvider(query.username, query.gamingProvider);
//   }

// }
