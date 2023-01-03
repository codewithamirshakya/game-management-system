import { Module } from '@nestjs/common';

import { TYPES } from "./application/constants/types";
import { LoginRepository } from "./infrastructure/persistence/repository/login.repository";
import { LoginService } from "./application/services/arpStudio/login.service";
import { LoginController } from "../../../../apps/api/security/arpStudio/login.controller";
import { CoreSharedModule } from "../shared/shared.module";

const loginRepo = { provide: TYPES.repository.LoginRepositoryInterface, useClass: LoginRepository };

@Module({
    imports: [CoreSharedModule],
    controllers: [LoginController],
    providers: [loginRepo,LoginService],
})
export class SecurityModule {}
