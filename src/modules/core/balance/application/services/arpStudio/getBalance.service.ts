import { GetBalanceDto } from "../../dtos/request/arpStudio/getBalance.dto";
import { GetBalanceDto as DomainGetBalanceDto } from "../../../domain/dto/request/arpStudio/getBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetBalanceRepositoryInterface } from "../../../domain/repository/arpStudio/getBalance.repository.interface";

export class GetBalanceService {
  constructor(
    @Inject(TYPES.repository.GetBalanceRepositoryInterface) private repo: GetBalanceRepositoryInterface,
  ) {}


  public getBalance(dto: GetBalanceDto) {
      return this.repo.getBalance(Object.assign(new DomainGetBalanceDto(),dto));
  }
}