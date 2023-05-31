import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import dataSource, { dataSourceOptions } from "../../../../db/data-source";
import { LoggerModule } from "nestjs-pino";
import { RequestAndResponseLoggerMiddleware } from "./middlewares/requestAndResponseLogger.middleware";
import pino from "pino";
import { addTransactionalDataSource } from "typeorm-transactional";
import { modules } from "./modules";
import { EventEmitterModule } from "@nestjs/event-emitter";
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
    EventEmitterModule.forRoot(),
    ...modules
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestAndResponseLoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
