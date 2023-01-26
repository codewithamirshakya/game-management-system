import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { AuthenticateRepositoryInterface } from "../../../domain/repository/vela/authenticate.repository.interface";
import { AuthenticateDto } from "../../../domain/dto/request/vela/authenticate.dto";

export class AuthenticateService {
  constructor(
    @Inject(TYPES.velaRepository.AuthenticateRepositoryInterface) private repo: AuthenticateRepositoryInterface,
  ) {}

  async authenticate(dto: AuthenticateDto) {
      return this.repo.authenticate(dto);
  }
}