import { Module } from "@nestjs/common";
import { CoreSharedModule } from "../shared/shared.module";
import { CqrsModule } from "@nestjs/cqrs";
import { DependenciesConstants } from "./dependencies.constants";
import { Providers } from "./providers";
import { Controllers } from "./controllers";
import { SharedModule } from "../../shared/shared.module";

@Module({
    imports: [CoreSharedModule, CqrsModule, SharedModule],
    controllers: Controllers,
    providers: [
      ...Providers,
      ...DependenciesConstants,
    ],

})
export class SecurityModule {}
