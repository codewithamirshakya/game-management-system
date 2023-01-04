import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/core/user/users.module";
import { SharedModule } from "./modules/shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import dataSource, { dataSourceOptions } from "../db/data-source";
import { SecurityModule } from "./modules/core/security/security.module";
import { LoggerModule } from "nestjs-pino";
import { RequestAndResponseLoggerMiddleware } from "./requestAndResponseLogger.middleware";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { ApiLogModule } from "./modules/core/apiLog/apiLog.module";
import { CqrsModule } from "@nestjs/cqrs";
import pino from "pino";
import { addTransactionalDataSource } from "typeorm-transactional";

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(dataSource);
      },
    }),
    // TypeOrmModule.forRoot(dataSourceOptions),
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pino.destination({
          dest: "logs/pino.log",
          minLength: 4096,
          sync: false //asynchronous logging
        }),
        customProps: (req, res) => ({
          context: "HTTP"
        }),
        transport: {
          targets: [
            // {
            //   target: "pino-pretty",
            //   options: {
            //     singleLine: true,
            //     colorize: true,
            //     destination: "logs/pino.log"
            //   },
            //   level: "debug"
            // },
            {
              target: "pino-pretty",
              options: {
                singleLine: true,
                colorize: true
              },
              level: "debug"
            }
          ]
        }
      }
    }),
    UsersModule,
    SharedModule,
    SecurityModule,
    ApiLogModule,
    CqrsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestAndResponseLoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
