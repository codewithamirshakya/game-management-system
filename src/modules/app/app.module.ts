import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../core/user/users.module";
import { SharedModule } from "../shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import dataSource, { dataSourceOptions } from "../../../db/data-source";
import { SecurityModule } from "../core/security/security.module";
import { LoggerModule } from "nestjs-pino";
import { RequestAndResponseLoggerMiddleware } from "./middlewares/requestAndResponseLogger.middleware";
import { ApiLogModule } from "../core/apiLog/apiLog.module";
import { CqrsModule } from "@nestjs/cqrs";
import pino from "pino";
import { addTransactionalDataSource } from "typeorm-transactional";

@Module({
  imports: [
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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestAndResponseLoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
