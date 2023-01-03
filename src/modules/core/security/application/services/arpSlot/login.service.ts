import { LoginArpStudioDto } from "../../dto/request/login.arpStudio.dto";
import { Inject } from "@nestjs/common";
import { TYPES } from "../../constants/types";
import { LoginRepositoryInterface } from "../../../domain/repository/login.repository.interface";

export class LoginService {
  constructor(
    @Inject(TYPES.repository.LoginRepositoryInterface) private loginRepo: LoginRepositoryInterface,
  ) {}

  async login(loginArpStudioDto: LoginArpStudioDto){
    return this.loginRepo.arpSlotLogin(loginArpStudioDto);
  }

}