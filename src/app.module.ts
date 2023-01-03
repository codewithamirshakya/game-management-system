import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/core/user/users.module";
import { SharedModule } from "./modules/shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import { dataSourceOptions } from "../db/data-source";
import { SecurityModule } from "./modules/core/security/security.module";
import { LoggerModule } from "nestjs-pino";
import { RequestAndResponseLoggerMiddleware } from "./requestAndResponseLogger.middleware";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { ApiLogModule } from "./modules/core/apiLog/apiLog.module";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    UsersModule,
    SharedModule,
    SecurityModule,
    ApiLogModule,
    CqrsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestAndResponseLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
