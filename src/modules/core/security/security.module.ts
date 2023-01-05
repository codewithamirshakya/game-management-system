import { Module } from '@nestjs/common';

import { TYPES } from "./application/constants/types";
import { LoginRepository } from "./infrastructure/persistence/repository/login.repository";
import { LoginService } from "./application/services/arpStudio/login.service";
import { LoginController } from "../../../../apps/api/arpStudio/security/login.controller";
import { CoreSharedModule } from "../shared/shared.module";
import { CqrsModule } from "@nestjs/cqrs";
import { LogoutRepository } from "./infrastructure/persistence/repository/logout.repository";
import { LogoutController } from "../../../../apps/api/arpStudio/security/logout.controller";
import { LogoutService } from "./application/services/arpStudio/logout.service";

const loginRepo = { provide: TYPES.repository.LoginRepositoryInterface, useClass: LoginRepository };
const logoutRepo = { provide: TYPES.repository.LogoutRepositoryInterface, useClass: LogoutRepository };

@Module({
    imports: [CoreSharedModule, CqrsModule],
    controllers: [LoginController,LogoutController],
    providers: [loginRepo,LoginService,logoutRepo,LogoutService],
})
export class SecurityModule {}
