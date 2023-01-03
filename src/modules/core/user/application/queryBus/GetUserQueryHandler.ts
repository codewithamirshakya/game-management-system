import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "src/modules/core/shared/domain/query/user/GetUserQuery";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  execute(query: GetUserQuery): Promise<any> {
    return Promise.resolve(undefined);
  }

}
