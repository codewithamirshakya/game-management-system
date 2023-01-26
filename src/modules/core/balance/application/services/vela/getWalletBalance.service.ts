import { GetBalanceDto } from "../../dtos/request/vela/getBalance.dto";
import { GetBalanceDto as DomainGetBalanceDto } from "../../../domain/dto/request/vela/getBalance.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import {
  GetWalletBalanceRepositoryInterface
} from "../../../domain/repository/velaGaming/getWalletBalance.repository.interface";

export class GetWalletBalanceService {
  constructor(
    @Inject(TYPES.velaRepository.GetWalletBalanceRepositoryInterface) private repo: GetWalletBalanceRepositoryInterface,
  ) {}


  public getBalance(dto: GetBalanceDto) {
      return this.repo.getBalance(new DomainGetBalanceDto(dto));
  }
}