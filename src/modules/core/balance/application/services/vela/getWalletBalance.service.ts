import { GetBalanceDto } from "../../dtos/request/vela/getBalance.dto";
import { GetBalanceDto as DomainGetBalanceDto } from "../../../domain/dto/request/vela/getBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { GetBalanceRepositoryInterface } from "../../../domain/repository/velaGaming/getBalance.repository.interface";

export class GetWalletBalanceService {
  constructor(
    @Inject(TYPES.velaRepository.GetBalanceRepositoryInterface) private repo: GetBalanceRepositoryInterface,
  ) {}


  public getBalance(dto: GetBalanceDto) {
      return this.repo.getBalance(new DomainGetBalanceDto(dto));
  }
}